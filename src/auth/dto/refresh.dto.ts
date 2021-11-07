import {ApiProperty} from "@nestjs/swagger";

export class RefreshDto {
    @ApiProperty({description: "refreshToken, который можно получить после входа или регистрации"})
    refreshToken: string
}