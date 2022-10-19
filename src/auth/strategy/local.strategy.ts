import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super();
    }

    // TO-DO: fix return
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.authenticateLDAP(username, password, (err, res) => {
            if (err) {
                // TO-DO: handle exception
                console.log('ERROR');
            }
        });
        return user;
    }
}