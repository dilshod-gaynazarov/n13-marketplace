import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization is not find');
    }
    const bearer = authorization.split(' ')[0];
    const token = authorization.split(' ')[1];
    if (!bearer || !token) {
      throw new UnauthorizedException('Bearer or token is not given');
    }
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new ForbiddenException('Forbidden user');
    }
    request.user = payload;
    return true;
  }
}
