import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, UserRoleAssignment } from '../../shared/models/user.model';
import { UserRole } from '../../shared/models/user-role.enum';
import { Permission } from '../../shared/models/permission.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private rolesSubject = new BehaviorSubject<UserRole[]>([]);
  private permissionsSubject = new BehaviorSubject<Permission[]>([]);

  token$ = this.tokenSubject.asObservable();
  roles$ = this.rolesSubject.asObservable();
  permissions$ = this.permissionsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => this.saveSession(res))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(res => this.saveSession(res))
    );
  }

  logout(): void {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.rolesSubject.next([]);
    this.permissionsSubject.next([]);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  hasPermission(permission: Permission): boolean {
    return this.permissionsSubject.value.includes(permission);
  }

  hasRole(role: UserRole): boolean {
    return this.rolesSubject.value.includes(role);
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  private saveSession(res: AuthResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('roles', JSON.stringify(res.roles));
    localStorage.setItem('permissions', JSON.stringify(res.permissions));
    this.tokenSubject.next(res.token);
    this.rolesSubject.next(res.roles);
    this.permissionsSubject.next(res.permissions);
  }

  private loadFromStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          this.tokenSubject.next(token);
          const roles = JSON.parse(localStorage.getItem('roles') || '[]');
          const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
          this.rolesSubject.next(roles);
          this.permissionsSubject.next(permissions);
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }
}
