import { Book } from '../../books/entities/book.entity';

export class Author {
  id: number;
  name: string;
  books?: Book[];
}
