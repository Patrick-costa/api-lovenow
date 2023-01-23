import { Body, Controller, Param, Post } from "@nestjs/common";
import { MessageDTO } from "src/dto/message/message.dto";
import { MessageService } from "src/services/message/message.service";

@Controller('message')
export class MessageController {

    constructor(
        private messageService: MessageService
    ){

    }

    @Post(":id")
    create(
        @Param("id") id: number,
        @Body() messageDTO: MessageDTO
    ){
        return this.messageService.sendMensage(id, messageDTO)
    }

}
