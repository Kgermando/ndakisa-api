import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor( 
        private jwtService: JwtService,
        private readonly config: ConfigService
        ) { }

    async userId(request: Request): Promise<number> {
        const token = this.config.get<string>('token');

        // const cookie = request.cookies['jwt'];
        const cookie = request.cookies[token];

        console.log(cookie);

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }
}
