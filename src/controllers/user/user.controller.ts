import { Controller, Get, Body, Post, Param, Put, Delete , Req } from "@nestjs/common";
import { LikeDTO } from "src/dto/like/like.dto";
import { UserDTO } from "src/dto/user/user.dto";
import { UserService } from "src/services/user/user.service";
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthGuard } from "src/auth/guards/auth.guard"; 

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){

    }

    @Get('profile')
    findUser(
        @Req() req
    ){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.getUserByToken(token);
    }

    @Get()
    findAll(){
        return this.userService.findAll()
    }

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

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() userDTO: UserDTO
    ){
        return this.userService.update(id, userDTO)
    }

    @Delete(':id')
    remove(
        @Param('id') id: number
    ){
        return this.userService.remove(id);
    }
}
