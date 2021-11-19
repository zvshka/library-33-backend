import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './roles-auth.decorator';

export const Auth = (role = 'USER') => {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
