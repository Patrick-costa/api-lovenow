import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity('pictures')
export class Pictures{
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @Column()
    name: string;

    @ManyToOne(type => User, user => user.pics)
    @JoinColumn({
        name: "user_id"
    })
    user: User;


}