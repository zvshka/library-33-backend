import { Module } from '@nestjs/common';
import { OffencesService } from './offences.service';
import { OffencesController } from './offences.controller';

@Module({
  controllers: [OffencesController],
  providers: [OffencesService]
})
export class OffencesModule {}
