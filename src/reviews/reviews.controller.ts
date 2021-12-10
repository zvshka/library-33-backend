import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ReviewsService} from './reviews.service';
import {CreateReviewDto} from './dto/create-review.dto';
import {UpdateReviewDto} from './dto/update-review.dto';
import {ApiTags} from "@nestjs/swagger";
import {User} from "../auth/decorators/user.decorator";

@ApiTags("Отзывы")
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {
    }

    @Post()
    create(@User() user, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(+id, updateReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewsService.remove(+id);
    }
}
