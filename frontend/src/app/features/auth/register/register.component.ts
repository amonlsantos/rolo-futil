import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { RegisterRequest } from '../../../shared/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div class="row section">
      <div class="six columns offset-by-three card">
        <h4 class="text-center login-title">Criar Conta</h4>
        <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <label for="name">Nome</label>
            <input id="name" name="name" type="text" class="u-full-width" [(ngModel)]="request.name" required placeholder="Seu nome">
          </div>
          <div class="row">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" class="u-full-width" [(ngModel)]="request.email" required placeholder="your@email.com">
          </div>
          <div class="row">
            <label for="password">Senha</label>
            <input id="password" name="password" type="password" class="u-full-width" [(ngModel)]="request.password" required placeholder="password" minlength="6">
          </div>
          <p *ngIf="error" class="error-text">{{ error }}</p>
          <div class="row">
            <input type="submit" class="button-primary u-full-width" value="Criar Conta" [disabled]="loading">
          </div>
        </form>
        <p class="text-center" style="margin-top: 1.5rem;">
          Já tem conta? <a routerLink="/login">Login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-title { margin-bottom: 2rem; }
  `]
})
export class RegisterComponent {
  request: RegisterRequest = { name: '', email: '', password: '' };
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.auth.register(this.request).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = err.error?.message || 'Erro ao criar conta';
        this.loading = false;
      }
    });
  }
}
