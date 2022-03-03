import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ReviewsService} from './reviews.service';
import {CreateReviewDto} from './dto/create-review.dto';
import {UpdateReviewDto} from './dto/update-review.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {User} from "../auth/decorators/user.decorator";
import {Auth} from "../auth/decorators/auth.decorator";

@ApiTags("Отзывы")
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {
    }

    @ApiOperation({
        security: [{bearer: []}],
    })
    @Auth()
    @Post()
    create(@User() user, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(user, createReviewDto);
    }

    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewsService.findOne(+id);
    }

    @ApiOperation({
        security: [{bearer: []}],
    })
    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @User() user) {
        return this.reviewsService.update(+id, updateReviewDto, user);
    }

    @ApiOperation({
        security: [{bearer: []}],
    })
    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string, @User() user) {
        return this.reviewsService.remove(+id, user);
    }
}
