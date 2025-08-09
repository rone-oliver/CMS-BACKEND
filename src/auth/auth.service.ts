import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';
import { PasswordService } from 'src/common/security/password.service';
import {
  IUserService,
  IUserServiceToken,
} from 'src/user/interfaces/user.service.interface';
import { CreateUserInput } from 'src/user/types/user.types';

import { LoginRequestDto } from './dtos/requests/user.requests.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly _passwordService: PasswordService,
    @Inject(IUserServiceToken)
    private readonly _userService: IUserService,
  ) {}

  async register(body: CreateUserInput): Promise<SuccessResponseDto> {
    return this._userService.createUser(body);
  }

  async login(credentials: LoginRequestDto): Promise<SuccessResponseDto> {
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
    return new SuccessResponseDto({
      message: 'Login successful',
    });
  }
}
