import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { PlanRemboursementService } from './plan_remboursement.service';
import { PlanRemboursementCreateDto } from './models/plan_remboursement-create.dto';
import { PlanRemboursementUpdateDto } from './models/plan_remboursement-update.dto';
import type { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('plan_remboursements')
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

    @Get('get-plan-remboursement-cohorte/:id')
    async getAllPlanRemboursementCohorte(
        @Param('id') id: number,
    ) {
      return this.planRemboursementService.getAllPlanRemboursementCohorte(id);
    }

    @Get('get-plan-remboursement-banque/:id')
    async getAllPlanRemboursementBanque(
        @Param('id') id: number,
    ) {
      return this.planRemboursementService.getAllPlanRemboursementBanque(id);
    }

    @Post('download-xlsx/:id')
    async downloadReport(
        @Res() res: Response,
        @Param('id') id: number,
        ) {
        let result = await this.planRemboursementService.downloadExcel(id);
            res.set("Content-Type", "text/xlsx");
        res.download(`${result}`);
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
