import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/dto/user/user.dto";
import { Interests } from "src/entities/interests/interests";
import { User } from "src/entities/user/user";
import { Location } from "src/entities/location/location";
import { Connection, Repository } from "typeorm";
import { AgeRange } from "src/entities/age_range/age_range";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Interests)
        private interestsRepository: Repository<Interests>,

        @InjectRepository(Location)
        private locationRepository: Repository<Location>,

        @InjectRepository(AgeRange)
        private ageRangeRepository: Repository<AgeRange>,

        private dbconn: Connection
    ){}

    findAll(){
        return this.userRepository.find({
            relations: ['location','interests', 'age_range']
        });
    }

    async findOne(id: number){
        let user = await this.userRepository.findOne({
            where: { id },
            relations: ['location','interests', 'age_range']
        })

        if(!user){
            throw new NotFoundException(
                `Course ID ${id} not found`
            )
        }

        return user;
    }

    async create(userDTO: UserDTO){
        const interests = await Promise.all(
            userDTO.interests.map(name => this.preloadInterests(name)),
        );

        const location = await this.preloadLocation(userDTO.location);

        const ageRange = await this.preloadAgeRange(userDTO.age_range);

        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(userDTO.senha, salt);

        const user = this.userRepository.create({
            ...userDTO,
            interests,
            location,
            age_range: ageRange,
            senha: hashedPassword
        });
    
        return this.userRepository.save(user)
    }

    async update(id: number, userDTO: UserDTO){

        const interests = userDTO.interests && await Promise.all(
            userDTO.interests.map(name => this.preloadInterests(name)),
        );

        const location = userDTO.location && await this.preloadLocation(userDTO.location);

        const ageRange = userDTO.age_range && await this.preloadAgeRange(userDTO.age_range);
        
        const user = await this.userRepository.preload({
            id: +id,
            ...userDTO,
            location,
            interests,
            age_range: ageRange
        });

        if(!user){
            throw new NotFoundException(
                `User ID ${id} não encontrado`
            )
        }

        return this.userRepository.save(user);
    }

    async remove(id: number){
        const user = await this.userRepository.findOne(id);

        if(!user){
            throw new NotFoundException(
                `User ID ${id} não encontrado`
            )
        }

        return this.userRepository.remove(user)
    }

    async findOneByEmail(email: string){
        const user = await this.userRepository.findOne({
            where: {email: email}
        })

        return user;
    }
    
    private async preloadInterests(name: string): Promise<Interests>{
        const interests = await this.interestsRepository.findOne({name});

        if(interests){
            return interests;
        }

        return this.interestsRepository.create({name});
    }

    private async preloadLocation(cord: number[]): Promise<Location>{
        return await this.locationRepository.create({
            lat: cord[0],
            long: cord[1]
        });
    }

    private async preloadAgeRange(ageArray: number[]): Promise<AgeRange>{
        return await this.ageRangeRepository.create({
            age_min: ageArray[0],
            age_max: ageArray[1]
        });
    }
}