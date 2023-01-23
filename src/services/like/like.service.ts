import {  Injectable, NotFoundException } from "@nestjs/common";
import { ChatDTO } from "src/dto/chat/chat.dto";
import { LikeDTO } from "src/dto/like/like.dto";
import { Chat } from "src/entities/chat/chat";
import { User } from "src/entities/user/user";
import { Connection } from "typeorm";
import { ChatService } from "../chat/chat.service";
import { UserService } from "../user/user.service";

@Injectable()
export class LikeService{

    constructor(private dbconn: Connection,
                private chatService: ChatService,
                private userService: UserService){

    }

    async createLike(likeDTO: LikeDTO){
        let query = `INSERT INTO likes(user_id, user_like_id) VALUES(${likeDTO.user_id}, ${likeDTO.user_like_id})`;
        let status:boolean = false;
        let t = await this.dbconn.manager.query(query).then(() => {
            status = true;
        });

        return this.verifyMatchAndCreateChat(likeDTO);
    }

    async verifyMatchAndCreateChat(likeDTO: LikeDTO){
        let query = `SELECT * FROM likes WHERE user_id = ${likeDTO.user_id} AND user_like_id = ${likeDTO.user_like_id}
        OR user_id = ${likeDTO.user_like_id} AND user_like_id = ${likeDTO.user_id}`;

        let match = await this.dbconn.manager.query(query);
        
        if(match.length > 1 ){
            const [user1, user2] = await Promise.all([
                this.userService.findOne(likeDTO.user_id),
                this.userService.findOne(likeDTO.user_like_id),
            ]);

            let newChat = new Chat();
            newChat.timestamp = new Date();
            newChat.users = [user1, user2]

            let chat = await this.chatService.createChat(newChat);

            if(!chat){
                throw new NotFoundException(
                    `Erro ao criar chat`
                )
            }

            return "MATCH"
        }
    }

    


}