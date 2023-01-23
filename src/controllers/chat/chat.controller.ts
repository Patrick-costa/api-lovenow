import { Controller, Delete, Get, Param } from "@nestjs/common";
import { ChatService } from "src/services/chat/chat.service";

@Controller('chat')
export class ChatController {

    constructor(
        private chatService: ChatService
    ){

    }

    @Get()
    findAll(){
        return this.chatService.findAllChats()
    }

    @Delete(":id")
    remove(
        @Param("id") id: number
    ){
        return this.chatService.deleteChats(id)
    }
}
