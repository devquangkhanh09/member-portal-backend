import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    getUserProfile(@Req() req: Request) {
        return this.userService.getUserProfile(req);
    }
}
