import {Book} from "../../books/entities/book.entity";

export class Publisher {
    id: number
    name: string
    books?: Book[]
}
