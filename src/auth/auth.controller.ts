import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AUTH_PATHS } from './constants/auth-paths.constants';
import {
  LoginRequestDto,
  RegisterRequestDto,
} from './dtos/requests/user.requests.dto';
import {
  IAuthService,
  IAuthServiceToken,
} from './interfaces/auth.service.interface';

@ApiTags(AUTH_PATHS.ROOT)
@Controller(AUTH_PATHS.ROOT)
export class AuthController {
  constructor(
    @Inject(IAuthServiceToken)
    private readonly _authService: IAuthService,
  ) {}

  @Post(AUTH_PATHS.USER.REGISTER)
  register(@Body() body: RegisterRequestDto) {
    return this._authService.register(body);
  }

  @Post(AUTH_PATHS.USER.LOGIN)
  login(@Body() body: LoginRequestDto) {
    return this._authService.login(body);
  }
}
