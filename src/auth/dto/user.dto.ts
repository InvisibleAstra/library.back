import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'aleks.kalina@gmailcom', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: '1aq2wefj4', description: 'user password' })
  readonly password: string;
}
