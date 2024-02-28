import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { BanqueCohorteService } from './banque_cohorte.service';
import { BanqueCohorteCreateDto } from './models/banque-cohorte.-create.dto';
import { BanqueCohorteUpdateDto } from './models/banque-cohorte.-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('banque-cohortes')
export class BanqueCohorteController {
    constructor(
        private banqueCohorteService: BanqueCohorteService
    ) {}

    @Get('get-guarantie-banque/:id')
    async guarantieBanque(
        @Param('id') id: number
    ) {
      return this.banqueCohorteService.getGuarantieBanque(id);
    }

    @Get('get-total-guarantie-banque/:id')
    async totalGuarantieBanque(
        @Param('id') id: number
    ) {
      return this.banqueCohorteService.totalGuarantieBanque(id);
    }

    @Get('get-total-guarantie-cohorte/:id')
    async totalGuarantieCohorte(
        @Param('id') id: number
    ) {
      return this.banqueCohorteService.totalGuarantieCohorte(id);
    }

    @Get('get-all-data')
    async getAllData() {
      return this.banqueCohorteService.getAllData();
    }

    @Get('get-all')
    async getAll() {
      return this.banqueCohorteService.all();
    }

    @Post()
    async create(
        @Body() body: BanqueCohorteCreateDto
    ) {
        return this.banqueCohorteService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.banqueCohorteService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: BanqueCohorteUpdateDto
    ) {
        const update_created = new Date();
        await this.banqueCohorteService.update(id, {...body, update_created}); 
        return this.banqueCohorteService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.banqueCohorteService.delete(id);
    }
}
