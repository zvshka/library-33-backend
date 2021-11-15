import {UserEntity} from "../../users/entities/user.entity";

export class UserDto {
    user: UserEntity
    accessToken: string
    refreshToken: string
}