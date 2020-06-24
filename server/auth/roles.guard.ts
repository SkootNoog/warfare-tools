import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], userRole){
    let allowed = false;

    if (userRole === 'admin') {
      allowed = true;
      return allowed;
    }

    for(const role of roles){
      if (userRole === role){
        allowed = true;
        break;
      }
    }
    return allowed;
  }
}
