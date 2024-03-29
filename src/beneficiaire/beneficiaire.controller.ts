import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { BeneficiaireService } from './beneficiaire.service';
import { BeneficiaireCreateDto } from './models/beneficiaire-create.dto';
import { BeneficiaireUpdateDto } from './models/beneficiaire-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('beneficiaires')
export class BeneficiaireController {
    constructor(
        private beneficiaireService: BeneficiaireService
    ) {}

    @Get('get-all-cohorte/:id')
    async getAllCohorte(
        @Param('id') id: number,
    ) {
      return this.beneficiaireService.getAllCohorte(id);
    }

    @Get('get-all-banque/:id')
    async getAllBanque(
        @Param('id') id: number,
    ) {
      return this.beneficiaireService.getAllBanque(id);
    }

    @Get('get-all-secteur/:id')
    async getAllSecteur(
        @Param('id') id: number,
    ) {
      return this.beneficiaireService.getAllSecteur(id);
    }

    @Get('taux-progression-beneficiaire/:id')
    async tauxProgessionBeneficiaire(
        @Param('id') id: number
    ) {
        return this.beneficiaireService.tauxProgessionBeneficiaire(id);
    }

    @Get('reste-a-payer/:id')
    async resteAPayer(
        @Param('id') id: number
    ) {
        return this.beneficiaireService.resteAPayer(id);
    }

    @Get('get-all')
    async getAll() {
      return this.beneficiaireService.findGetAll();
    }

    @Post()
    async create(
        @Body() body: BeneficiaireCreateDto
    ) {
        return this.beneficiaireService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.beneficiaireService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: BeneficiaireUpdateDto
    ) {
        const update_created = new Date();
        await this.beneficiaireService.update(id, {...body, update_created}); 
        return this.beneficiaireService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.beneficiaireService.delete(id);
    }
}
