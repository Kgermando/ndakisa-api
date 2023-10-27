import { Module } from '@nestjs/common';
import { BeneficiaireController } from './beneficiaire.controller';
import { BeneficiaireService } from './beneficiaire.service';

@Module({
  controllers: [BeneficiaireController],
  providers: [BeneficiaireService]
})
export class BeneficiaireModule {}
