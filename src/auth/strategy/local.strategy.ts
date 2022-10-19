import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super();
    }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.authenticateLDAP(username, password)
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}