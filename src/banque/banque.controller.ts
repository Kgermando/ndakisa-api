import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { BanqueService } from './banque.service';
import { BanqueCreateDto } from './models/banque-create.dto';
import { BanqueUpdateDto } from './models/banque-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('banques')
export class BanqueController {
    constructor(
        private banqueService: BanqueService
    ) {}

    @Get('get-all-nav')
    async getAllData() {
      return this.banqueService.getAllData();
    }

    @Get('get-all')
    async getAll() {
      return this.banqueService.all();
    }

    @Post()
    async create(
        @Body() body: BanqueCreateDto
    ) {
        return this.banqueService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.banqueService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: BanqueUpdateDto
    ) {
        const update_created = new Date();
        await this.banqueService.update(id, {...body, update_created}); 
        return this.banqueService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.banqueService.delete(id);
    }
}
