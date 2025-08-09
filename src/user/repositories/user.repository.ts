import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User, UserDocument } from '../models/user.schema';
import { CreateUserInput } from '../types/user.types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}
  async create(user: CreateUserInput): Promise<UserDocument> {
    return this._userModel.create(user);
  }

  async find(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    return this._userModel.findOne(filterQuery).exec();
  }

  async findOneWithPassword(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    return this._userModel.findOne(filter).select('+password').exec();
  }
}
