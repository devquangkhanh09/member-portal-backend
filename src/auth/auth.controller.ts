import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @UseGuards(LocalGuard)
    @Post('signin')
<<<<<<< HEAD
    async signin(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
=======
    async signin(@Req() req, @Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        //return req.body.username;
>>>>>>> fb0b58e (fix bug ldap unauthorized)
        return this.authService.signin(authDto, res);
    }
}