import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserRoleAssignment } from '../../shared/models/user.model';
import { UserRole } from '../../shared/models/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  assignRole(userId: string, role: UserRole): Observable<UserRoleAssignment> {
    return this.http.post<UserRoleAssignment>(`${this.apiUrl}/users/${userId}/roles`, { role });
  }

  removeRole(userId: string, role: UserRole): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/roles/${role}`);
  }

  getUserRoles(userId: string): Observable<UserRoleAssignment[]> {
    return this.http.get<UserRoleAssignment[]>(`${this.apiUrl}/users/${userId}/roles`);
  }
}
