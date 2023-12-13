import { Body, ClassSerializerInterceptor, Controller, Delete, Get,
    Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { CohorteService } from './cohorte.service';
import { CohorteCreateDto } from './models/cohorte-create.dto';
import { CohorteUpdateDto } from './models/cohorte-update.dto';
import type { Response } from 'express';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('cohortes')
export class CohorteController {
    constructor(
        private cohorteService: CohorteService
    ) {}

    @Get('get-all-nav')
    async getAll() {
      return this.cohorteService.all();
    }

    @Get('get-all')
    async getAllData() {
      return this.cohorteService.getAllData();
    }

    @Get('taux-progression-cohorte/:id')
    async tauxProgessionCohorte(
        @Param('id') id: number
    ) {
        return this.cohorteService.tauxProgessionCohorte(id);
    }

    @Get('nbre-beneficiaire-cohorte/:id')
    async nbreBeneficiaireCohorte(
        @Param('id') id: number
    ) {
        return this.cohorteService.nbreBeneficiaireCohorte(id);
    }

    @Post('download-xlsx/:start_date/:end_date')
    async downloadReport(
        @Res() res: Response,
        @Param('start_date') start_date: Date,
        @Param('end_date') end_date: Date
        ) {
        let result = await this.cohorteService.downloadExcel(start_date, end_date); 
            res.set("Content-Type", "text/xlsx");
        res.download(`${result}`);
    }

    @Post()
    async create(
        @Body() body: CohorteCreateDto
    ) {
        return this.cohorteService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.cohorteService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CohorteUpdateDto
    ) {
        const update_created = new Date();
        await this.cohorteService.update(id, {...body, update_created}); 
        return this.cohorteService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.cohorteService.delete(id);
    }
}
