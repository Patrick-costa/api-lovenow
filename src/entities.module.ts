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
    AgeRange
  ]),
  ],
  controllers: [UserController, LikeController, ChatController, MessageController, AuthController],
  providers: [UserService, LikeService, ChatService, MessageService, AuthService]
})
export class EntitiesModule { }