import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { UserRole } from '../../../shared/models/user-role.enum';
import { UserRoleAssignment } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  template: `
    <h4>User Role Management</h4>

    <div class="card">
      <div class="form-row">
        <div class="eight columns">
          <label>User ID</label>
          <input class="u-full-width" [(ngModel)]="userId" placeholder="User UUID">
        </div>
        <div class="four columns">
          <label>Role</label>
          <select class="u-full-width" [(ngModel)]="selectedRole">
            <option *ngFor="let role of roles" [value]="role">{{ role }}</option>
          </select>
        </div>
      </div>
      <div class="flex-row">
        <button class="button-primary" (click)="assign()">Assign Role</button>
        <button class="button-danger" (click)="remove()">Remove Role</button>
        <button class="button" (click)="list()">List Roles</button>
      </div>
    </div>

    <div *ngIf="assignments.length" class="roles-list">
      <h6>Current Roles:</h6>
      <p *ngFor="let a of assignments">{{ a.role }}</p>
    </div>
  `,
  styles: [`
    .form-row { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .roles-list { background: var(--bg-secondary); border: 1px solid var(--bg-tertiary); border-radius: 4px; padding: 1.5rem; }
  `]
})
export class UserManagementComponent {
  userId = '';
  selectedRole: UserRole = UserRole.WRITER;
  roles = Object.values(UserRole);
  assignments: UserRoleAssignment[] = [];

  constructor(private admin: AdminService) {}

  assign(): void {
    this.admin.assignRole(this.userId, this.selectedRole).subscribe({
      next: () => alert('Role assigned'),
      error: (err) => alert(err.error || 'Error')
    });
  }

  remove(): void {
    this.admin.removeRole(this.userId, this.selectedRole).subscribe({
      next: () => alert('Role removed'),
      error: (err) => alert(err.error || 'Error')
    });
  }

  list(): void {
    this.admin.getUserRoles(this.userId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }
}
