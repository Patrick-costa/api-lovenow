import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body, Get } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../service/auth.service';
import { LoginDTO } from '../dto/loginDTO.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.createToken(user);
    return { token };
  }

}

