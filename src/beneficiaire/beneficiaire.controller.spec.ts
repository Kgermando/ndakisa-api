import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiaireController } from './beneficiaire.controller';

describe('BeneficiaireController', () => {
  let controller: BeneficiaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiaireController],
    }).compile();

    controller = module.get<BeneficiaireController>(BeneficiaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
