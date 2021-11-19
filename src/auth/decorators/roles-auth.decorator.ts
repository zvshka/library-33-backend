import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const ADMIN = 'ADMIN';
export const USER = 'USER';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
