import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import type { Response } from 'express';
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

    @Get('get-log/:start_date/:end_date')
    async allGetLog(
        @Param('start_date') start_date: string,
        @Param('end_date') end_date: string
    ) {
        return this.logService.allGetLog(start_date, end_date);
    }

    @Post('download-xlsx/:start_date/:end_date')
    async downloadReport(
        @Res() res: Response,
        @Param('start_date') start_date: Date,
        @Param('end_date') end_date: Date
        ) {
        let result = await this.logService.downloadExcel(start_date, end_date); 
            res.set("Content-Type", "text/xlsx");
        res.download(`${result}`);
    }


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
