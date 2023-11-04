import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PlanRemboursementService } from './plan_remboursement.service';
import { PlanRemboursementCreateDto } from './models/plan_remboursement-create.dto';
import { PlanRemboursementUpdateDto } from './models/plan_remboursement-update.dto';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('planremboursements')
export class PlanRemboursementController {
    constructor(
        private planRemboursementService: PlanRemboursementService
    ) {}

    @Get('get-all/:id')
    async getAll(
        @Param('id') id: number,
    ) {
      return this.planRemboursementService.findGetAll(id);
    }

    @Post()
    async create(
        @Body() body: PlanRemboursementCreateDto
    ) {
        return this.planRemboursementService.create(body);
    }

    @Get('get/:id')
    async get(@Param('id') id: number) {
        return this.planRemboursementService.findGetOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: PlanRemboursementUpdateDto
    ) {
        const update_created = new Date();
        await this.planRemboursementService.update(id, {...body, update_created}); 
        return this.planRemboursementService.findOne({where: {id}});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.planRemboursementService.delete(id);
    }
}
