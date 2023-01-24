import { IsString } from "class-validator";
import { IsBoolean, IsInt } from "class-validator";
import { EntityIdDTO } from "../entityIdDTO/entityId.dto";


export class UserDTO{

    @IsInt()
    id: number = 0;

    @IsString()
    name: string = "";
 
    @IsInt()
    age: number = 0;

    @IsString()
    email: string = "";

    @IsString()
    password: string = "";

    @IsString({ each: true })
    readonly interests: string[];
 
    @IsString()
    gender: string = "";
 
    @IsString()
    about_me: string = "";
 
    @IsString()
    work: string = "";
 
    @IsInt()
    max_distance: number = 0;

    @IsInt({ each: true })
    location: number[];
 
    @IsInt({ each: true })
    age_range: number[];
 
    @IsBoolean()
    privacy: boolean = false;
 
    @IsString()
    photo: string = "";

    // like: EntityIdDTO = null;
}