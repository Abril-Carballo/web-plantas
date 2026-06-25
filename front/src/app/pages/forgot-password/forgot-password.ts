import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = '';
  message = '';
  error = '';
  loading = signal(false)

  constructor(private authService: AuthService ) { }

  onSubmit() {
    this.message = '';
    this.error = '';
    this.loading.set(true)

    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = res.message;
         this.loading.set(false)
        
      },
      error: (e) => {
        
        this.error = 'Ocurrió un error, intentá de nuevo.';
       
         this.loading.set(false)
      },
    });
  }
}