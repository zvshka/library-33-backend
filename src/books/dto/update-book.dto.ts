import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    id: number
    title?: string
    description?: string
    publisher?: number
    authors?: number[]
    styles?: number[];
}
