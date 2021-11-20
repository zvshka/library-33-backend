import {AuthorEntity} from '../../authors/entities/author.entity';
import {Style} from '../../styles/entities/style.entity';
import {Publisher} from '../../publishers/entities/publisher.entity';

export class Book {
    id: number
    title: string
    description: string
    publisher?: Publisher
    authors?: AuthorEntity[]
    styles?: Style[]
}
