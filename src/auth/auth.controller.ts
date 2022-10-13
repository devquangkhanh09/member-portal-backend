import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'
import * as passport from 'passport';
import { LdapGuard } from './guard/ldap.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    // TO-DO: use ldap guard, keep username and password (not necessarily AuthDto) to pass to signin
    @UseGuards(LdapGuard)
	@Post('signin')
    // Authenticate ldap
	ldapLogin(@Req() req) {
		passport.authenticate('ldap', { session: false });
		return req.user;
	}
    //Jira sign-in
    async signin(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        return this.authService.signin(authDto, res);
    }

    
}
