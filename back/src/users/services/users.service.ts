import { ExternalUser } from '../user.types';
import { USERS_GATEWAY, UsersGateway } from '../gateways/users.gateway';
import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; // 1.6: agregamos BadRequestException y UnauthorizedException
import { InjectRepository } from '@nestjs/typeorm'; //para inyectar el repositorio de TypeORM
import { Repository } from 'typeorm'; 
import { UserEntity } from '../user.entity'; 
import * as bcrypt from 'bcrypt'; // para verificar y hashear contraseñas
import { ConfigService } from '@nestjs/config'; 
import { UserRole } from '../user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_GATEWAY)
    private readonly usersGateway: UsersGateway,
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>, 
    private readonly cfg: ConfigService, 
  ) {}

  async findAll(): Promise<ExternalUser[]> {
    try {
      return await this.usersGateway.fetchAll();
    } catch {
      throw new BadGatewayException('Upstream users service failed');
    }
  }

  async findOne(id: number): Promise<ExternalUser> {
    try {
      const user = await this.usersGateway.fetchById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new BadGatewayException('Upstream users service failed');
    }
  }

 
  async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.usersRepo
      .createQueryBuilder('u')
      .addSelect('u.passwordHash') 
      .where('u.id = :id', { id: userId })
      .getOne();

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) throw new BadRequestException('La contraseña actual es incorrecta');

    const rounds = Number(this.cfg.get<string>('BCRYPT_COST') ?? '12');
    user.passwordHash = await bcrypt.hash(newPassword, rounds); 

    await this.usersRepo.save(user);

    return { message: 'Password updated' };
  }

    async updateEmail(userId: string, newEmail: string, password: string): Promise<{ message: string }> {
      const user = await this.usersRepo
        .createQueryBuilder('u')
        .addSelect('u.passwordHash') 
        .where('u.id = :id', { id: userId })
        .getOne();

      if (!user) throw new UnauthorizedException('Usuario no encontrado');

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new BadRequestException('La contraseña es incorrecta');

      user.email = newEmail.trim().toLowerCase();

      await this.usersRepo.save(user);

      return { message: 'Email updated' };
    }

  async updateRole(requesterId: string, targetId: string, role: string): Promise<{ id: string; email: string; role: string; isVerified: boolean }> {
    if (requesterId === targetId) {
      throw new BadRequestException('Cannot change your own role');
    }

    const target = await this.usersRepo.findOne({ where: { id: targetId } });
    if (!target) throw new NotFoundException('Usuario no encontrado');

    if (role === 'user' && target.role === 'admin') {
      const adminCount = await this.usersRepo.count({ where: { role: UserRole.ADMIN } });
      if (adminCount <= 1) throw new BadRequestException('Cannot demote the only admin');
    }

    target.role = role as UserRole;
    await this.usersRepo.save(target);

    return {
      id: target.id,
      email: target.email,
      role: target.role,
      isVerified: target.isVerified,
    };
  }
}

