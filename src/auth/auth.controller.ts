import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LdapGuard } from './guard/ldap.guard';
import * as passport from 'passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    // TO-DO: use ldap guard, keep username and password (not necessarily AuthDto) to pass to signin
    // @UseGuards(LdapGuard)  
	// @Post('signin')
    // async signin(@Req() req, @Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
    //     passport.authenticate('ldap', { session: false });
    //     return this.authService.signin(authDto, res);
    // }   

    @Post('signin')
    async signin(@Req() req, @Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        let ans: number = 0;
        this.authService.authenticateLDAP(req, ans);
        if (ans == 1) throw UnauthorizedException;
        return this.authService.signin(authDto, res);
    }
}