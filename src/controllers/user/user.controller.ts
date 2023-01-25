import { Controller, Get, Body, Post, Param, Put, Delete , Req } from "@nestjs/common";
import { LikeDTO } from "src/dto/like/like.dto";
import { UserDTO } from "src/dto/user/user.dto";
import { UserService } from "src/services/user/user.service";
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthGuard } from "src/auth/guards/auth.guard"; 
import { ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){

    }

    @ApiResponse({status: 200, description: "OK", type: UserDTO})
    @UseGuards(AuthGuard)
    @Get('profile')
    findUser(
        @Req() req
    ){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.getUserByToken(token);
    }

    @ApiResponse({status: 200, description: "OK", type: UserDTO})
    @UseGuards(AuthGuard)
    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(
        @Param('id') id: number
    ){
        return this.userService.findOne(id)
    }

    @Post()
    create(
        @Body() userDTO: UserDTO
    ){
        return this.userService.create(userDTO)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() userDTO: UserDTO
    ){
        return this.userService.update(id, userDTO)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(
        @Param('id') id: number
    ){
        return this.userService.remove(id);
    }
}
