import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    getUserProfile(@Req() req: Request) {
        return this.userService.getUserProfile(req);
    }
}
