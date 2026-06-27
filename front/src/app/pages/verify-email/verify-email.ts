import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmailPage {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  loading = signal(true);
  success = signal(false);

  constructor() {
    this.verify();
  }

  private async verify(): Promise<void> {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.toast.error('Token inválido o faltante');
      this.success.set(false);
      this.loading.set(false);
      return;
    }

    try {
      await firstValueFrom(this.auth.verifyEmail(token));
      this.toast.success('Email verificado correctamente');
      this.success.set(true);
    } catch (err: any) {
      this.toast.error(err.error?.message || 'Token inválido o expirado');
      this.success.set(false);
    } finally {
      this.loading.set(false);
    }
  }
}