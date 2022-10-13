import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    // TO-DO: use ldap guard, keep username and password (not necessarily AuthDto) to pass to signin
    @Post('signin')
    async signin(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        return this.authService.signin(authDto, res);
    }
}
