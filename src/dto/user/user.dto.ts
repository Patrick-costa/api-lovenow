import { IsEmail, IsString } from "class-validator";
import { IsBoolean, IsInt } from "class-validator";


export class UserDTO{

    @IsInt()
    readonly id: number;

    @IsString()
    @IsEmail()
    readonly name: string;
    
    @IsInt()
    readonly age: number;

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString({ each: true })
    readonly interests: string[];
 
    @IsString()
    gender: string;
 
    @IsString()
    about_me: string;
 
    @IsString()
    work: string;
 
    @IsInt()
    max_distance: number;

    @IsInt({ each: true })
    location: number[];
 
    @IsInt({ each: true })
    age_range: number[];
 
    @IsBoolean()
    privacy: boolean;
 
    @IsString()
    photo: string;
}