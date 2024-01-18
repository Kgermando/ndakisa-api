import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SupportModuleService } from './support-module.service';
import { SupportModuleDocCreateDto } from './models/support-module-create.dto';
import { SupportModuleDocUpdateDto } from './models/support-module-update.dto';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('support-modules')
export class SupportModuleController {
    constructor(
        private supportModuleService: SupportModuleService
    ) {}

    @Get('get-all')
    async getAll() {
      return this.supportModuleService.allGet();
    }
 
    @Post()
    async create(
        @Body() body: SupportModuleDocCreateDto
    ) {
        return this.supportModuleService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
      return this.supportModuleService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: SupportModuleDocUpdateDto
    ) {
        const update_created = new Date();
        await this.supportModuleService.update(id, {...body, update_created});  
        return this.supportModuleService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.supportModuleService.delete(id);
    }
}
