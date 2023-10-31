import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { CohorteService } from './cohorte.service';
import { CohorteCreateDto } from './models/cohorte-create.dto';
import { CohorteUpdateDto } from './models/cohorte-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('cohortes')
export class CohorteController {
    constructor(
        private cohorteService: CohorteService
    ) {}

    @Get('get-all')
    async getAll() {
      return this.cohorteService.all();
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
