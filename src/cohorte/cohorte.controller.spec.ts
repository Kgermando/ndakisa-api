import { Test, TestingModule } from '@nestjs/testing';
import { CohorteController } from './cohorte.controller';

describe('CohorteController', () => {
  let controller: CohorteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohorteController],
    }).compile();

    controller = module.get<CohorteController>(CohorteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
