import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './core/auth/auth.service';
import { UserRole } from './shared/models/user-role.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <div class="navbar">
      <div class="container">
        <a class="brand" routerLink="/">rolo futil</a>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <ng-container *ngIf="auth.isAuthenticated(); else guest">
            <a *ngIf="auth.hasAnyRole(writerRoles)" routerLink="/writer/drafts" routerLinkActive="active">Drafts</a>
            <a *ngIf="auth.hasAnyRole(editorRoles)" routerLink="/editor/posts" routerLinkActive="active">Posts</a>
            <a *ngIf="auth.hasRole(adminRole)" routerLink="/admin/users" routerLinkActive="active">Users</a>
            <a href="#" (click)="logout(); $event.preventDefault()">Logout</a>
          </ng-container>
          <ng-template #guest>
            <a routerLink="/login" routerLinkActive="active">Login</a>
          </ng-template>
        </div>
      </div>
    </div>

    <div class="container section">
      <router-outlet />
    </div>
  `,
})
export class App {
  protected readonly writerRoles = [UserRole.WRITER, UserRole.EDITOR, UserRole.ADMIN];
  protected readonly editorRoles = [UserRole.EDITOR, UserRole.ADMIN];
  protected readonly adminRole = UserRole.ADMIN;

  constructor(protected auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
