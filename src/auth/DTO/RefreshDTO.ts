import {ApiProperty} from "@nestjs/swagger";

export class RefreshDTO {
    @ApiProperty({})
    refreshToken: string
}