import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { SecteurCreateDto } from './models/secteur-create.dto';
import { SecteurUpdateDto } from './models/secteur-update.dto';
import { SecteursService } from './secteurs.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('secteurs')
export class SecteursController {
    constructor(
        private secteursService: SecteursService
    ) {}
 
    @Get('get-all')
    async getAll() {
      return this.secteursService.all();
    }

    @Post()
    async create(
        @Body() body: SecteurCreateDto
    ) {
        return this.secteursService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.secteursService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: SecteurUpdateDto
    ) {
        const update_created = new Date();
        await this.secteursService.update(id, {...body, update_created}); 
        return this.secteursService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.secteursService.delete(id);
    }
}
