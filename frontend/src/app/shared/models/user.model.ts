import { UserRole } from './user-role.enum';
import { Permission } from './permission.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  permissions: Permission[];
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
  roles: UserRole[];
  permissions: Permission[];
}

export interface UserRoleAssignment {
  id: string;
  userId: string;
  role: UserRole;
}
