import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthServiceToken } from './interfaces/auth.service.interface';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthServiceToken,
      useClass: AuthService,
    },
  ],
  exports: [IAuthServiceToken],
  imports: [UserModule],
})
export class AuthModule {}
