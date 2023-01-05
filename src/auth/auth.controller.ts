import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LocalGuard } from './guard/local.guard';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    // NOTE: temporarily disabled due to VPN issue
    // @UseGuards(LocalGuard)
    @Post('signin')
    async signin(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        return this.authService.signin(authDto, res);
    }
}