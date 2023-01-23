import { User } from "../user/user";
import { Column, OneToOne, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Location{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    long: number;

    @Column()
    lat: number;

    @OneToMany(type => User, user => user.location, {onDelete: 'CASCADE'})
    user: User;


}