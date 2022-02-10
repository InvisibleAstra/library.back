import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel) private userRepo: typeof UsersModel,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: UserDto) {
    const user = await this.getUserByEmail(userDto.email);
    if (user) {
      throw new HttpException('User exist', HttpStatus.BAD_REQUEST);
    } else {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const newUser: UserDto = { ...userDto, password: hashPassword };
      const user = await this.userRepo.create(newUser);
      return await this.generateToken(user);
    }
  }

  async authorization(userDto: UserDto) {
    const user = await this.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      console.log('success auth');
      return await this.generateToken(userDto);
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }

  private async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  private async generateToken(user) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY,
        // signOptions: {
        //   expiresIn: '24h',
        // },
      }),
    };
  }
}
