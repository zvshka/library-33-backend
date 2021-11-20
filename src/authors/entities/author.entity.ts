import {Book} from '../../books/entities/book.entity';

export class AuthorEntity {
    id: number;
    name: string;
    description: string;
    books?: Book[];
}
