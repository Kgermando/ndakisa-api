import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { RemboursementService } from './remboursement.service';
import { RemboursementCreateDto } from './models/remboursement-create.dto';
import { RemboursementUpdateDto } from './models/remboursement-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('remboursements')
export class RemboursementController {
    constructor(
        private remboursementService: RemboursementService
    ) {}

    @Get('get-all/:id')
    async getAll(
        @Param('id') id: number,
    ) {
      return this.remboursementService.findGetAll(id);
    }

    @Post()
    async create(
        @Body() body: RemboursementCreateDto
    ) {
        return this.remboursementService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.remboursementService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: RemboursementUpdateDto
    ) {
        const update_created = new Date();
        await this.remboursementService.update(id, {...body, update_created}); 
        return this.remboursementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.remboursementService.delete(id);
    }
}
