import { IsInt } from "class-validator";

export class LocationDTO{

    @IsInt()
    id: number;

    @IsInt()
    long: number;

    @IsInt()
    lat: number;

    @IsInt()
    user: number;


}