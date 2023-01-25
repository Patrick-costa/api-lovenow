import { IsEmail, IsString } from "class-validator";
import { IsBoolean, IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class UserDTO{

    @ApiProperty({ 
        description: "Id do usuario",
        example: 1,
    })
    @IsInt()
    readonly id: number;

    @ApiProperty({ 
        description: "nome do usuario",
        example: "Carmelio",
    })
    @IsString()
    @IsEmail()
    readonly name: string;
    
    @ApiProperty({ 
        description: "Idade do usuario",
        example: 20,
    })
    @IsInt()
    readonly age: number;

    @ApiProperty({ 
        description: "Email do usuario",
        example: "carmelio@gmail.com",
    })
    @IsString()
    readonly email: string;

    @ApiProperty({ 
        description: "Senha do usuario",
        example: "123",
    })
    @IsString()
    readonly password: string;

    @ApiProperty({ 
        description: "Interesses do usuário",
        example: ["Rock", "Academia", "Futebol"],
    })
    @IsString({ each: true })
    readonly interests: string[];
 
    @ApiProperty({ 
        description: "Genero do usuario",
        example: "Masculino",
    })
    @IsString()
    gender: string;
 
    @ApiProperty({ 
        description: "Sobre o usuario",
        example: "Gosto de esportes",
    })
    @IsString()
    about_me: string;
 
    @ApiProperty({ 
        description: "Trabalho do usuario",
        example: "Tecnico",
    })
    @IsString()
    work: string;
 
    @ApiProperty({ 
        description: "Distancia maxima do usuario para busca",
        example: "20km",
    })
    @IsInt()
    max_distance: number;

    @ApiProperty({ 
        description: "Geolocalização do usuario",
        example: [12132323232,1214243535353],
    })
    @IsInt({ each: true })
    location: number[];
 
    @ApiProperty({ 
        description: "Idade range do usuario",
        example: [18,25],
    })
    @IsInt({ each: true })
    age_range: number[];
 
    @IsBoolean()
    privacy: boolean = false;
 
    @ApiProperty({ 
        description: "URL do caminho da foto do usuário",
        example: [18,25],
    })
    @IsString()
    photo: string;
}