import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity()
export class AgeRange{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age_min: number;

    @Column()
    age_max: number;

    @OneToOne(type => User, user => user.age_range, {onDelete: 'CASCADE'})
    user: User;

}