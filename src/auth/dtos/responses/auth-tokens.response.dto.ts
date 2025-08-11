import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT Access Token' })
  accessToken: string;
}
