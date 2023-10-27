import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private readonly config: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    try {
      const token = this.config.get<string>('token');

      const jwt = request.cookies[token];  // request.cookies['jwt'];
      return this.jwtService.verify(jwt);
    } catch(e) {
      return false;
    } 
    
  }
}
 