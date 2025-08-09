import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';
import { CreateUserInput } from 'src/user/types/user.types';

import { LoginRequestDto } from '../dtos/requests/user.requests.dto';

export const IAuthServiceToken = Symbol('IAuthService');

export interface IAuthService {
  register(body: CreateUserInput): Promise<SuccessResponseDto>;
  login(credentials: LoginRequestDto): Promise<SuccessResponseDto>;
}
