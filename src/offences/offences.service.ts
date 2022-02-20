import {Injectable} from '@nestjs/common';
import {CreateOffenceDto} from './dto/create-offence.dto';
import {UpdateOffenceDto} from './dto/update-offence.dto';

@Injectable()
export class OffencesService {
    create(createOffenceDto: CreateOffenceDto) {
        return 'This action adds a new offence';
    }

    findAll() {
        return `This action returns all offences`;
    }

    findOne(id: number) {
        return `This action returns a #${id} offence`;
    }

    update(id: number, updateOffenceDto: UpdateOffenceDto) {
        return `This action updates a #${id} offence`;
    }

    remove(id: number) {
        return `This action removes a #${id} offence`;
    }
}
