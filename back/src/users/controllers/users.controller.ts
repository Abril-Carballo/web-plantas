import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('me/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.usersService.updatePassword(req.user.id, body.currentPassword, body.newPassword);
  }

  @Patch('me/email')
  @UseGuards(JwtAuthGuard)
  updateEmail(
    @Req() req: any,
    @Body() body: { newEmail: string; password: string },
  ) {
    return this.usersService.updateEmail(req.user.id, body.newEmail, body.password);
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateRole(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { role: string },
  ) {
    return this.usersService.updateRole(req.user.id, id, body.role);
  }
}