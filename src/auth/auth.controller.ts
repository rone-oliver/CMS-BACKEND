import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AUTH_PATHS } from './constants/auth-paths.constants';
import {
  RegisterRequestDto,
} from './dtos/requests/register.request.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import {
  IAuthService,
  IAuthServiceToken,
} from './interfaces/auth.service.interface';
import { TokenPayload } from './services/token.service';
import { LoginRequestDto } from './dtos/requests/login.request.dto';

@ApiTags(AUTH_PATHS.ROOT)
@Controller(AUTH_PATHS.ROOT)
export class AuthController {
  constructor(
    @Inject(IAuthServiceToken)
    private readonly _authService: IAuthService,
  ) {}

  @Post(AUTH_PATHS.USER.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: RegisterRequestDto) {
    return this._authService.register(body);
  }

  @Post(AUTH_PATHS.USER.LOGIN)
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginRequestDto,
  ) {
    return this._authService.login(res, body);
  }

  @Delete(AUTH_PATHS.USER.LOGOUT)
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this._authService.logout(res);
  }

  @UseGuards(JwtRefreshGuard)
  @Post(AUTH_PATHS.USER.REFRESH)
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request) {
    const user = req.user as TokenPayload;
    return this._authService.refresh(user);
  }
}
