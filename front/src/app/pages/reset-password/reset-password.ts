import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] ?? '';
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  get isValid(): boolean {
    return this.password.length >= 8 && this.passwordsMatch;
  }

  onSubmit(): void {
    if (!this.passwordsMatch) {
      this.toast.error('Las contraseñas no coinciden.');
      return;
    }
    if (this.password.length < 8) {
      this.toast.error('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    this.loading.set(true);
    this.auth.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.toast.success('Contraseña actualizada');
        this.loading.set(false);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.toast.error(err.error?.message ?? 'Token inválido o expirado.');
        this.loading.set(false);
      },
    });
  }
}