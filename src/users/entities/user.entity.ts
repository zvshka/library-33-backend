import {Book} from "../../books/entities/book.entity";
import {Exclude} from "class-transformer";

export class UserEntity {
    id: number
    email: string
    username: string

    @Exclude()
    password: string

    firstName?: string
    lastName?: string

    @Exclude()
    secret: string

    role: string
    reviews?: []
    orders?: []
    offences?: []
    likedBooks?: Book[]

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
