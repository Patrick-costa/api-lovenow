import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PictureService } from 'src/assets/pictures/pictures.service';
import { imageFileInterceptor } from '../../interceptors/picture.interceptor';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async uploadFoto(@UploadedFile() photo, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return await this.pictureService.uploadPicture(photo, token);
  }
}