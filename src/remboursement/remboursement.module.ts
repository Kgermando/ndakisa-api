import { Module } from '@nestjs/common';
import { RemboursementController } from './remboursement.controller';
import { RemboursementService } from './remboursement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Remboursement } from './models/remboursement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Remboursement]),
    CommonModule,
  ],
  controllers: [RemboursementController],
  providers: [RemboursementService]
})
export class RemboursementModule {}
