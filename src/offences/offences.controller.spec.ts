import { Test, TestingModule } from '@nestjs/testing';
import { OffencesController } from './offences.controller';
import { OffencesService } from './offences.service';

describe('OffencesController', () => {
  let controller: OffencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffencesController],
      providers: [OffencesService],
    }).compile();

    controller = module.get<OffencesController>(OffencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
