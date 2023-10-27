import { Module } from '@nestjs/common';
import { CohorteController } from './cohorte.controller';
import { CohorteService } from './cohorte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Cohorte } from './models/cohorte.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cohorte]),
    CommonModule,
  ],
  controllers: [CohorteController],
  providers: [CohorteService]
})
export class CohorteModule {}
