import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { LogService } from './log.service';
import { LogCreateDto } from './models/log-create.dto';
import { LogUpdateDto } from './models/log-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('logs')
export class LogController {
    constructor(
        private logService: LogService
    ) {}

    @Get()
    async all(@Query('page') page = 1) {
        return this.logService.paginate(page);
    }

    @Post()
    async create(
        @Body() body: LogCreateDto
    ) {
        return this.logService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.logService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: LogUpdateDto
    ) { 
        await this.logService.update(id,body); 
        return this.logService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.logService.delete(id);
    }
}
