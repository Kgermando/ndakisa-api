import { Module } from '@nestjs/common';
import { BanqueCohorteController } from './banque_cohorte.controller';
import { BanqueCohorteService } from './banque_cohorte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { BanqueCohorte } from './models/banque-cohorte.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BanqueCohorte]),
    CommonModule,
  ],
  controllers: [BanqueCohorteController],
  providers: [BanqueCohorteService]
})
export class BanqueCohorteModule {}
