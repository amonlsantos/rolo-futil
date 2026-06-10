import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';
import { UserRole } from './shared/models/user-role.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/public/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'writer/drafts',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.WRITER },
    loadComponent: () =>
      import('./features/writer/drafts/drafts.component').then(m => m.DraftsComponent)
  },
  {
    path: 'writer/create',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.WRITER },
    loadComponent: () =>
      import('./features/writer/create-post/create-post.component').then(m => m.CreatePostComponent)
  },
  {
    path: 'editor/posts',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.EDITOR },
    loadComponent: () =>
      import('./features/editor/all-posts/all-posts.component').then(m => m.AllPostsComponent)
  },
  {
    path: 'admin/users',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.ADMIN },
    loadComponent: () =>
      import('./features/admin/user-management/user-management.component').then(m => m.UserManagementComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
