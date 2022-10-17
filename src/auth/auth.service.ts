import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Req } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';
import { AuthDto } from './dto';
import {createClient, SearchEntry, SearchRequest} from 'ldapjs';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}

    async authenticateLDAP(uid:string, password:string , callback: any){
        const client = createClient({
            url: 'ldap://10.1.1.1:389'
        });
        const bindName = `uid=${uid},cn=users,cn=accounts,dc=supernodexp,dc=hpc`;
        client.bind(bindName, password, (err, res) => {
            callback(err, res);
        })
        return uid;
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

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return this.httpService.post('https://jira.hpcc.vn/rest/auth/1/session', data, config)
            .pipe(
                catchError(err => throwError(() => new HttpException('cannot authenticate user', 401))),
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


