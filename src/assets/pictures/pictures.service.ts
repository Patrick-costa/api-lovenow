import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { Pictures } from 'src/entities/pictures/pictures';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user/user';


@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Pictures)
    private readonly pictureRepository: Repository<Pictures>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async uploadPicture(picture, token) {
    const userId = this.jwtService.verify(token).sub;
    const user = await this.userRepository.findOne(userId)
    const namePicture = `${uuid.v1()}-${picture.originalname}`;
    const path = `./src/assets/pictures/${namePicture}`;
    const url = `./src/assets/pictures/${namePicture}`;

    await fs.promises.writeFile(path, picture.buffer);

    const newPicture = new Pictures();
    newPicture.url = url;
    newPicture.name = namePicture;
    newPicture.user = user;

    await this.pictureRepository.save(newPicture);

    return newPicture;
  }
}