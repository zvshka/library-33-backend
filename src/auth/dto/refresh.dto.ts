import {ApiProperty} from "@nestjs/swagger";
import * as Joiful from "joiful";

export class RefreshDto {
    @ApiProperty({description: "refreshToken, который можно получить после входа или регистрации"})
    @Joiful.string().required()
    refreshToken: string
}