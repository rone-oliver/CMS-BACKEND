import { FilterQuery } from 'mongoose';

import { UserDocument } from '../models/user.schema';
import { CreateUserInput } from '../types/user.types';

export const IUserRepositoryToken = Symbol('IUserRepository');

export interface IUserRepository {
  create(user: CreateUserInput): Promise<UserDocument>;
  find(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument | null>;
  findOneWithPassword(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null>;
}
