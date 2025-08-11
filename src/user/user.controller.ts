import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/services/token.service';

import { USER_PATHS } from './constants/user-path.constants';
import {
  IUserService,
  IUserServiceToken,
} from './interfaces/user.service.interface';

@ApiTags(USER_PATHS.ROOT)
@Controller(USER_PATHS.ROOT)
export class UserController {
  constructor(
    @Inject(IUserServiceToken)
    private readonly _userService: IUserService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(USER_PATHS.PROFILE)
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: Request) {
    const user = req.user as TokenPayload;
    return this._userService.profile(user.id);
  }
}
