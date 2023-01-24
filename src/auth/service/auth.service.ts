import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
                
    @InjectRepository(User)
    private userRepository: Repository<User>,
    ) {}

  async createToken(user: any) {
    const payload = { sub: user.id, username: user.email };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
      // remove password before send to client
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}