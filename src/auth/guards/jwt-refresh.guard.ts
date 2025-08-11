import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { Response } from 'express';

function getErrorName(info: unknown): string | null {
  if (typeof info !== 'object' || info === null) return null;
  const name = (info as { name?: unknown }).name;
  return typeof name === 'string' ? name : null;
}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  // Match IAuthGuard signature while keeping internals type-safe.

  handleRequest<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TUser = any,
  >(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    user: TUser,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
    context: ExecutionContext,
  ): TUser {
    const errorName = getErrorName(info);
    const shouldTreatAsExpired = errorName === 'TokenExpiredError' || err || !user;

    if (shouldTreatAsExpired) {
      const res = context.switchToHttp().getResponse<Response>();
      res.setHeader(
        'WWW-Authenticate',
        'Bearer error="invalid_token", error_description="refresh token missing or expired"',
      );
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Unauthorized',
        isRefreshTokenExpired: true,
      });
    }

    return user;
  }
}
