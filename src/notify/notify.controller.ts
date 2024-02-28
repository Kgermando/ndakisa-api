import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import type { Response } from 'express';
import { NotifyCreateDto } from './models/notify-create.dto';
import { NotifyUpdateDto } from './models/notify-update.dto';
import { NotifyService } from './notify.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('notifications')
export class NotifyController {
    constructor(
        private notifyService: NotifyService
    ) {}

    @Get('get-current-date')
    async getCurrentDate() {
      return this.notifyService.getCurrentDate();
    }

    @Post()
    async create(
        @Body() body: NotifyCreateDto
    ) {
        return this.notifyService.create(body);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: NotifyUpdateDto
    ) {
        const update_created = new Date();
        await this.notifyService.update(id, {...body, update_created}); 
        return this.notifyService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.notifyService.delete(id);
    }
}
