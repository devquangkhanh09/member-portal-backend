import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @UseGuards(LocalGuard)
    @Post('signin')
    async signin(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        return this.authService.signin(authDto, res);
    }
}