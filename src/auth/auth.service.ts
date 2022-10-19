import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';
import { AuthDto } from './dto';
import { createClient } from 'ldapjs';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}

    // TO-DO: fix return
    async authenticateLDAP(username: string, password: string, callback) {
        const client = createClient({
            url: 'ldap://10.1.1.1:389'
        });
        const bindName = `uid=${username},cn=users,cn=accounts,dc=supernodexp,dc=hpc`;
        client.bind(bindName, password, callback);
        return username;
    }

    parseCookie(str: string) {
        const props = str.split(';').map(prop => prop.trim());
        const nameVal = props[0].split('=');
        return {
            name: nameVal[0],
            value: nameVal[1],
            path: props[1].split('=')[1],
            // other props
        }
    }

    async signin(authDto: AuthDto, res: Response) {
        const data = {
            username: authDto.username,
            password: authDto.password
        };

        return this.httpService.post('https://jira.hpcc.vn/rest/auth/1/session', data)
            .pipe(
                catchError(err => throwError(() => new HttpException('Jira: cannot authenticate user', 401))),
                tap(response => {
                    const cookies = response.headers['set-cookie'];
                    cookies.forEach(cookie => {
                        const parsedCookie = this.parseCookie(cookie);
                        res.cookie(parsedCookie.name, parsedCookie.value, {
                            path: parsedCookie.path,
                            // other options
                        });
                    });
                }),
                map(response => response.data)
            );
    }
}


