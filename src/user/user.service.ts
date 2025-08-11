import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';
import { PasswordService } from 'src/common/security/password.service';

import { UserResponseDto } from './dtos/responses/user.response.dto';
import {
  IUserRepository,
  IUserRepositoryToken,
} from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserInput, UserForAuth } from './types/user.types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly _passwordService: PasswordService,
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: IUserRepository,
  ) {}

  async createUser(input: CreateUserInput): Promise<SuccessResponseDto> {
    const sameEmailUser = await this._userRepository.find({
      email: input.email,
    });
    if (sameEmailUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const sameUsernameUser = await this._userRepository.find({
      username: input.username,
    });
    if (sameUsernameUser) {
      throw new BadRequestException('User with this username already exists');
    }

    const hashedPassword = await this._passwordService.hash(input.password);
    const user = await this._userRepository.create({
      ...input,
      password: hashedPassword,
    });
    if (!user) {
      throw new InternalServerErrorException('User creation failed');
    }

    return new SuccessResponseDto({
      message: 'User created successfully',
    });
  }

  async findUser(filter: {
    email?: string;
    username?: string;
  }): Promise<UserResponseDto> {
    const user = await this._userRepository.find(filter);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const plain = user.toObject();
    return plainToInstance(UserResponseDto, plain, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmailForAuth(email: string): Promise<UserForAuth | null> {
    const user = await this._userRepository.findOneWithPassword({ email });
    if (!user) return null;
    return {
      id: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      passwordHash: user.password,
    };
  }

  async profile(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepository.find({ _id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const plain = user.toObject();
    return plainToInstance(UserResponseDto, plain, {
      excludeExtraneousValues: true,
    });
  }
}
