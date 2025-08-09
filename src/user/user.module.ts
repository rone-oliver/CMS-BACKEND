import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PasswordService } from 'src/common/security/password.service';

import { IUserRepositoryToken } from './interfaces/user.repository.interface';
import { IUserServiceToken } from './interfaces/user.service.interface';
import { User, userSchema } from './models/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: IUserServiceToken,
      useClass: UserService,
    },
    {
      provide: IUserRepositoryToken,
      useClass: UserRepository,
    },
    PasswordService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  exports: [IUserServiceToken, PasswordService],
})
export class UserModule {}
