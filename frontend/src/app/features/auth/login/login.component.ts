import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginRequest } from '../../../shared/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="row section">
      <div class="six columns offset-by-three card">
        <h4 class="text-center login-title">Login</h4>
        <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" class="u-full-width" [(ngModel)]="request.email" required placeholder="your@email.com">
          </div>
          <div class="row">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" class="u-full-width" [(ngModel)]="request.password" required placeholder="password">
          </div>
          <p *ngIf="error" class="error-text">{{ error }}</p>
          <input type="submit" class="button-primary u-full-width" value="Login" [disabled]="loading">
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-title { margin-bottom: 2rem; }
  `]
})
export class LoginComponent {
  request: LoginRequest = { email: '', password: '' };
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.auth.login(this.request).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => { this.error = 'Invalid credentials'; this.loading = false; }
    });
  }
}
