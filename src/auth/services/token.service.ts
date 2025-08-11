import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async signAccessToken(payload: TokenPayload): Promise<string> {
    const options = this._getJwtOptions('JWT_ACCESS_EXPIRES');
    return this._jwtService.signAsync(payload, options);
  }

  async signRefreshToken(payload: TokenPayload): Promise<string> {
    const options = this._getJwtOptions('JWT_REFRESH_EXPIRES');
    return this._jwtService.signAsync(payload, options);
  }

  // Currently not using; passport handles this.
  async verifyRefreshToken(refreshToken: string): Promise<TokenPayload> {
    return this._jwtService.verifyAsync(refreshToken, {
      secret: this._configService.get<string>('JWT_SECRET'),
    });
  }

  private _getJwtOptions(expiresInKey: string): JwtSignOptions {
    return {
      secret: this._configService.get<string>('JWT_SECRET'),
      expiresIn: this._configService.get<string>(expiresInKey),
    };
  }
}
