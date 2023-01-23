import { IsDate, IsInt, IsString } from "class-validator";

export class MessageDTO{

    @IsInt()
    id: number = 0;

    @IsInt() 
    sender_id: number = 0;
    
    @IsInt()
    recipient_id: number = 0;

    @IsString()
    description: string = "";

    @IsDate()
    datetime?: Date = null;

}