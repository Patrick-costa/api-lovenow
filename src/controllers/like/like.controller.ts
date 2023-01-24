import { Body, Controller, Get, Post } from "@nestjs/common";
import { LikeDTO } from "src/dto/like/like.dto";
import { LikeService } from "src/services/like/like.service";
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthGuard } from "src/auth/guards/auth.guard"; 

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController{

    constructor(
        private likeService: LikeService
    ){

    }

    @Post()
    create(
        @Body() likeDTO: LikeDTO
    ){
        return this.likeService.createLike(likeDTO);
    }
}