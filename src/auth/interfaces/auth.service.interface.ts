import { Response } from 'express';

import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';
import { CreateUserInput } from 'src/user/types/user.types';

import { LoginRequestDto } from '../dtos/requests/user.requests.dto';
import { LoginResponseDto } from '../dtos/responses/auth-tokens.response.dto';
import { TokenPayload } from '../services/token.service';

export const IAuthServiceToken = Symbol('IAuthService');

export interface IAuthService {
  register(body: CreateUserInput): Promise<SuccessResponseDto>;
  login(res: Response, credentials: LoginRequestDto): Promise<LoginResponseDto>;
  refresh(user: TokenPayload): Promise<LoginResponseDto>;
  logout(res: Response): SuccessResponseDto;
}
