import {Book} from "../../books/entities/book.entity";

export class User {
    id:number
    name: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    role: string
    reviews: []
    orders: []
    offences: []
    likedBooks: Book[]
}
