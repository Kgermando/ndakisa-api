import { Module } from '@nestjs/common';
import { BeneficiaireController } from './beneficiaire.controller';
import { BeneficiaireService } from './beneficiaire.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiaire } from './models/beneficiaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Beneficiaire]),
    CommonModule,
  ],
  controllers: [BeneficiaireController],
  providers: [BeneficiaireService]
})
export class BeneficiaireModule {}
