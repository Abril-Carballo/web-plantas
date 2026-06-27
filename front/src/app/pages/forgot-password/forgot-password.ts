import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  email = '';
  loading = signal(false);

  onSubmit(): void {
    this.loading.set(true);
    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.toast.success('Si el email existe, recibirás un link');
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Ocurrió un error, intentá de nuevo.');
        this.loading.set(false);
      },
    });
  }
}