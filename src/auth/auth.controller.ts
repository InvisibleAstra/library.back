import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post('/registration')
  async registration(@Body() userDto: UserDto) {
    return await this.AuthService.registration(userDto);
  }

  @ApiOperation({ summary: 'authorization user' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post('authorization')
  async authorization(@Body() userDto: UserDto) {
    return await this.AuthService.authorization(userDto);
  }
}
