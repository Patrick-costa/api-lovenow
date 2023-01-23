import { HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDTO } from "src/dto/message/message.dto";
import { Chat } from "src/entities/chat/chat";
import { Message } from "src/entities/message/message";
import { Connection, Repository } from "typeorm";

@Injectable()
export class MessageService{
    
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        private dbconn: Connection
    ){

    }

    async sendMensage(chatId: number, messageDTO: MessageDTO){
        const chat = await this.getChatById(chatId);

        let message = await this.messageRepository.create({
            ...messageDTO,
            chat,
            datetime: new Date()
        });

        return this.messageRepository.save(message);
    }

    async getChatById(id: number): Promise<Chat>{
        let chat = await this.chatRepository.findOne(id);

        if(chat){
            return chat;
        }

    }
}