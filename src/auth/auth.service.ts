import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}

    async signin(authDto: AuthDto, res: Response) {
        const data = {
            username: authDto.username,
            password: authDto.password
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return this.httpService.post('https://jira.hpcc.vn/rest/auth/1/session', data, config)
            .pipe(
                catchError(err => throwError(() => new HttpException('cannot authenticate user', 401))),
                tap(response => res.setHeader('set-cookie', response.headers['set-cookie'])),
                map(response => response.data)
            )
    }
}
