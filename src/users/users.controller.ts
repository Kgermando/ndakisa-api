import { BadRequestException, Body, ClassSerializerInterceptor, 
    Controller, Delete, Get, Param, Post, Put, Req, 
    UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDto } from './models/user-create.dto';
import { User } from './models/user.entity';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
      ) {}

    @Get('all')
    async getAll() {
      return this.userService.all();
    }

    @Post()
        async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);
        return this.userService.create({ 
            ...body,
            password
        });
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.userService.findGetOne({id});
    }
  
    // User lui même modifie
    @Put('info')
    async updateInfo(
      @Req() request: Request,
      @Body() body: UserUpdateDto ) {
      const id = await this.authService.userId(request);
  
      const update_created = new Date();
      await this.userService.update(id, {...body, update_created});
      
      return this.userService.findGetOne({id});
    }
  
  
    @Put('password')
    async updatePassword(
      @Req() request: Request, 
      @Body('password') password: string,
      @Body('password_confirm') password_confirm: string,
    ) {
      if(password !== password_confirm) {
        throw new BadRequestException("Mot de passe de correspond pas.");
    }
      const id = await this.authService.userId(request);
  
      const hashed = await bcrypt.hash(password, 12);
  
      await this.userService.update(id, {
        password: hashed
      });
      
      return this.userService.findGetOne({id});
    }
  
  
    // Modification des infos user par l'admin
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() body: UserUpdateDto
    ) { 
  
      const update_created = new Date();
      await this.userService.update(id, {...body, update_created});   
      return this.userService.findGetOne({id});
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
