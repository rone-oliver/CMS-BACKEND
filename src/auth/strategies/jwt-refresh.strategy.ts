import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '../services/token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          type RequestWithCookies = Request & {
            cookies?: Record<string, unknown>;
          };
          const reqWithCookies = request as RequestWithCookies;
          const token: unknown = reqWithCookies.cookies?.refreshToken;
          return typeof token === 'string' ? token : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  validate(payload: TokenPayload): TokenPayload {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
  }
}
