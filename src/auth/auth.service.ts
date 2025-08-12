import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';
import { PasswordService } from 'src/common/security/password.service';
import {
  IUserService,
  IUserServiceToken,
} from 'src/user/interfaces/user.service.interface';
import { CreateUserInput } from 'src/user/types/user.types';

import { LoginRequestDto } from './dtos/requests/user.requests.dto';
import { LoginResponseDto } from './dtos/responses/auth-tokens.response.dto';
import { IAuthService } from './interfaces/auth.service.interface';
import { TokenPayload, TokenService } from './services/token.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly _passwordService: PasswordService,
    @Inject(IUserServiceToken)
    private readonly _userService: IUserService,
    private readonly _tokenService: TokenService,
    private readonly _configService: ConfigService,
  ) {}

  async register(body: CreateUserInput): Promise<SuccessResponseDto> {
    return this._userService.createUser(body);
  }

  async login(
    res: Response,
    credentials: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const user = await this._userService.findByEmailForAuth(credentials.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatched = await this._passwordService.compare(
      credentials.password,
      user.passwordHash,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid password');
    }

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const accessToken = await this._tokenService.signAccessToken(payload);
    const refreshToken = await this._tokenService.signRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this._configService.get<string>('NODE_ENV') === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: this._parseTimeToMs(
        this._configService.get<string>('JWT_REFRESH_EXPIRES')!,
      ),
    });

    return { accessToken };
  }

  logout(res: Response): SuccessResponseDto {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: this._configService.get<string>('NODE_ENV') === 'production',
      path: '/',
      sameSite: 'strict',
    });
    return new SuccessResponseDto({
      message: 'Logout successful',
    });
  }

  async refresh(user: TokenPayload): Promise<LoginResponseDto> {
    const accessToken = await this._tokenService.signAccessToken(user);
    return { accessToken };
  }

  private _parseTimeToMs(timeString: string): number {
    const unit = timeString.charAt(timeString.length - 1);
    const value = parseInt(timeString.slice(0, -1));

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return value;
    }
  }
}
