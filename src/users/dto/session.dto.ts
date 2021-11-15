import {UserEntity} from "../entities/user.entity";

export class SessionDto {
    cookie: Object
    user: UserEntity
}