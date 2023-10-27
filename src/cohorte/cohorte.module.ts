import { Module } from '@nestjs/common';
import { CohorteController } from './cohorte.controller';
import { CohorteService } from './cohorte.service';

@Module({
  controllers: [CohorteController],
  providers: [CohorteService]
})
export class CohorteModule {}
