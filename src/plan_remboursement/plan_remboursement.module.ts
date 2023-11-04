import { Module } from '@nestjs/common';
import { PlanRemboursementController } from './plan_remboursement.controller';
import { PlanRemboursementService } from './plan_remboursement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { PlanRemboursement } from './models/plan_remboursement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanRemboursement]),
    CommonModule,
  ],
  controllers: [PlanRemboursementController],
  providers: [PlanRemboursementService]
})
export class PlanRemboursementModule {}
