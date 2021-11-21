import { PartialType } from '@nestjs/swagger';
import { CreateOffenceDto } from './create-offence.dto';

export class UpdateOffenceDto extends PartialType(CreateOffenceDto) {}
