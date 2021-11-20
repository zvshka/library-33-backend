import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform,} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            });
            throw new HttpException({
                message: "Провалена валидация",
                status: HttpStatus.BAD_REQUEST,
                errors: messages
            }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
