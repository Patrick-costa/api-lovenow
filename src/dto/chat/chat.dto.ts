import { IsDate, IsInt } from "class-validator";

export class ChatDTO{

    @IsInt()
    id: number = 0;

    @IsDate()
    timestamp: Date = null;
    
}