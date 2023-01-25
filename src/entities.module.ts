import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from 'src/controllers/like/like.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { LikeService } from 'src/services/like/like.service';
import { UserService } from 'src/services/user/user.service';
import { ChatController } from './controllers/chat/chat.controller';
import { MessageController } from './controllers/message/message.controller';
import { AgeRange } from './entities/age_range/age_range';
import { Chat } from './entities/chat/chat';
import { Interests } from './entities/interests/interests';
import { Location } from './entities/location/location';
import { Message } from './entities/message/message';
import { User } from './entities/user/user';
import { ChatService } from './services/chat/chat.service';
import { MessageService } from './services/message/message.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { AuthService } from './auth/service/auth.service';
import { AuthController } from './auth/controller/auth.controller';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Pictures } from './entities/pictures/pictures';
import { PictureService } from './assets/pictures/pictures.service';
import { PictureController } from './controllers/pictures/pictures.controller';
dotenv.config();

export const jwtConfig = {
  secret: 'mysecretkey',
  signOptions: {
    expiresIn: '1d',
  },
};

@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register(jwtConfig),
  TypeOrmModule.forFeature([
    User,
    Location,
    Chat,
    Message,
    Interests,
    AgeRange,
    Pictures
  ]),
  ],
  controllers: [UserController, LikeController, ChatController, MessageController, AuthController, PictureController],
  providers: [UserService, LikeService, ChatService, MessageService, AuthService, PictureService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true, // Só aceita as proriedades que estiverem no DTO
      forbidNonWhitelisted: true, // RETORNA ERRO SE TIVER ATRIBUTO A MAIS NO OBJETO
      transform: true, // TIPA O BODY DA REQUISIÇÃO
      forbidUnknownValues: false
    }),
  },]
})
export class EntitiesModule { }