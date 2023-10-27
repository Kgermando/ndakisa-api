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

    @Get('all')
    async getAll() {
      return this.beneficiaireService.all();
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
