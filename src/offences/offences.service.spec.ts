import { Test, TestingModule } from '@nestjs/testing';
import { OffencesService } from './offences.service';

describe('OffencesService', () => {
  let service: OffencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffencesService],
    }).compile();

    service = module.get<OffencesService>(OffencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
