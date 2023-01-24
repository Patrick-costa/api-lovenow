import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    if (auth) {
      const token = auth.split(' ')[1];
      try {
        request.user = this.jwtService.verify(token);
      } catch (err) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }
      const user = request.user;
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!user) {
        return false;
      }
      if (!roles) {
        return true;
      }
      return user.roles && user.roles.some(role => roles.includes(role));
    }
  }
}