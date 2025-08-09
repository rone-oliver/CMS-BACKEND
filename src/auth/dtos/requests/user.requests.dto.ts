import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export class RegisterRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ minLength: 4 })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
