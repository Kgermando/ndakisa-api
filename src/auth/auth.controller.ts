import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express'; 
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service'; 
import { ConfigService } from '@nestjs/config'; 
import { UsersService } from 'src/users/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private authService: AuthService, 
        private readonly config: ConfigService
        ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if(body.password !== body.password_confirm) {
            throw new BadRequestException("Mot de passe de correspond pas.");
        }
        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.create({
            photo: body.photo,
            nom: body.nom,
            postnom: body.postnom,
            prenom: body.prenom,
            email: body.email,
            telephone: body.telephone,
            adresse: body.adresse,
            sexe: body.sexe, 
            matricule: body.matricule, 
            statut_user: true,
            roles: body.roles,
            permission: body.permission, 
            signature: body.signature,
            created: body.created,
            update_created: body.update_created,
            password: hashed,
        }
        );
    }

    @Post('login')
    async login(
        @Body('matricule') matricule: string,
        @Body('password') password: string, 
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({
            where: { matricule: matricule }
        });
/*  */
        if(!user) {
            throw new NotFoundException('Identifiant non trouvé!');
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Votre mot de passe n\'est pas correct !');
        }

        if(!user.statut_user) {
            throw new BadRequestException("Ce compte n'est pas actif! ");
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        const token = this.config.get<string>('token');
        
        response.cookie(token, jwt, { httpOnly: true, secure:true, sameSite: 'none' });

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);
        return this.userService.findGetOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res() response: Response 
    ) {
        const token = this.config.get<string>('token');
        response.clearCookie(token);

        return {
            message: 'Success!'
        }
    }
 
}
