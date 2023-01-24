import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "aws-sdk/clients/budgets";
import { ChatDTO } from "src/dto/chat/chat.dto";
import { LikeDTO } from "src/dto/like/like.dto";
import { Chat } from "src/entities/chat/chat";
import { User } from "src/entities/user/user";
import { Connection, Repository } from "typeorm";



@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        private dbconn: Connection,
        private jwtService: JwtService
    ) {

    }

    async createChat(chatDTO: Chat) {
        let chat = await this.chatRepository.create(chatDTO);
        return this.chatRepository.save(chat);
    }

    async findAllChats(token: string) {
        const id = this.jwtService.verify(token).sub;

        const chats = await this.dbconn.manager.query(`
        SELECT * FROM chat AS c INNER JOIN chat_user AS cu ON cu.chatId  = 
        c.id INNER JOIN user AS u on u.id = cu.userId WHERE cu.userId != ${id} 
        AND chatId IN ((SELECT chatId FROM chat_user WHERE userId = ${id}));
        `)

        return chats;
    }

    async deleteChats(id: number){
        let chat = await this.chatRepository.findOne(id);

        return this.chatRepository.remove(chat);
    }

}
