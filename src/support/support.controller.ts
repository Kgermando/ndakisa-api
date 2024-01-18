import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard'; 
import { SupportService } from './support.service';
import { SupportCreateDto } from './models/support-create.dto';
import { SupportUpdateDto } from './models/support-update.dto';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('supports')
export class SupportController {
    constructor(
        private supportService: SupportService
    ) {}


    @Get('get-all-id/:id')
    async findGetAll(
      @Param('id') id: number,
    ) {
      return this.supportService.findGetAll(id);
    }


    @Get('get-all')
    async getAll() {
      return this.supportService.allGet();
    }
 
    @Post()
    async create(
        @Body() body: SupportCreateDto
    ) {
        return this.supportService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.supportService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: SupportUpdateDto
    ) {
        const update_created = new Date();
        await this.supportService.update(id, {...body, update_created});  
        return this.supportService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.supportService.delete(id);
    }
}
