import { JoinTable, Column, JoinColumn, OneToOne, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Chat } from "../chat/chat";

@Entity()
export class Message{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sender_id: number
    
    @Column()
    recipient_id: number

    @Column()
    description: string;

    @Column()
    datetime: Date;

    @ManyToOne(type => Chat, chat => chat.message)
    @JoinColumn({ name: 'chat_id'})
    chat: Chat;
}