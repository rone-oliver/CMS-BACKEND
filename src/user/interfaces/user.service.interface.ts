import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';

import { UserResponseDto } from '../dtos/responses/user.response.dto';
import { CreateUserInput, UserForAuth } from '../types/user.types';

export const IUserServiceToken = Symbol('IUserService');

export interface IUserService {
  createUser(input: CreateUserInput): Promise<SuccessResponseDto>;
  findUser(filter: {
    email?: string;
    username?: string;
  }): Promise<UserResponseDto>;
  findByEmailForAuth(email: string): Promise<UserForAuth | null>;
}
