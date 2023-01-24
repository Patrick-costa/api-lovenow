import { Controller, Delete, Get, Param, Req } from "@nestjs/common";
import { ChatService } from "src/services/chat/chat.service";
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthGuard } from "src/auth/guards/auth.guard"; 

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {

    constructor(
        private chatService: ChatService
    ){

    }

    @Get()
    findAll(
        @Req() req
    ){
        const token = req.headers.authorization.split(' ')[1];
        return this.chatService.findAllChats(token)
    }

    @Delete(":id")
    remove(
        @Param("id") id: number
    ){
        return this.chatService.deleteChats(id)
    }
}
