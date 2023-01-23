import { JoinTable, Column, ManyToMany, JoinColumn, OneToMany, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../message/message";
import { User } from "../user/user";

@Entity()
export class Chat{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    timestamp: Date;

    @ManyToMany(type => User, user => user.chat)
    @JoinTable({
        name: 'chat_user',
    })
    users: Array<User>;

    @OneToMany(type => Message, message => message.chat)
    message: Message;
}