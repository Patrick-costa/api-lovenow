import { JoinTable, Column, ManyToMany, JoinColumn, OneToOne, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Location } from "../location/location";
import { Interests } from "../interests/interests";
import { AgeRange } from "../age_range/age_range";
import { Chat } from "../chat/chat";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @ManyToMany(type => Interests, interests => interests.user, { cascade: true, onDelete: 'CASCADE'})
    @JoinTable()
    interests: Interests[];

    @Column()
    gender: string;

    @Column()
    about_me: string;

    @Column()
    work: string;

    @Column()
    max_distance: number;

    @OneToOne(type => Location, location => location.user, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @OneToOne(type => AgeRange, age => age.user, { cascade: true})
    @JoinColumn({ name: 'age_range_id' })
    age_range: AgeRange;


    @Column()
    privacy: boolean;

    @ManyToMany(type => User)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_like_id',
            referencedColumnName: 'id'
        }
    })
    like: Array<any>;

    @ManyToMany(type => Chat, chat => chat.users)
    chat: Array<Chat>;

    @Column({nullable: true})
    photo: string;
}