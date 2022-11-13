import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';
import { AuthDto } from './dto';
import {createClient} from 'ldapjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService, 
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async signToken(authDto: AuthDto){
        const payload = {
            username: authDto.username
        }
        const secret = this.configService.get<string>('JWT_SECRET');

        const token = await this.jwtService.signAsync(
            payload,
            {
                secret: secret
            }
        );
        return token;
    }

    async authenticateLDAP(uid: string, password: string) {
        return new Promise((resolve, reject) => {
            const client = createClient({
                url: 'ldap://10.1.1.1:389'
            });
            const bindName = `uid=${uid},cn=users,cn=accounts,dc=supernodexp,dc=hpc`;
            client.bind(bindName, password,  (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(uid);
                } 
            });
        })
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
        const token = await this.signToken(authDto);

        return this.httpService.post('https://jira.hpcc.vn/rest/auth/1/session', data)
            .pipe(
                catchError(err => throwError(() => new HttpException('Jira: cannot authenticate user', 401))),
                tap(async response => {
                    const cookies = response.headers['set-cookie'];
                    cookies.forEach(cookie => {
                        const parsedCookie = this.parseCookie(cookie);
                        res.cookie(parsedCookie.name, parsedCookie.value, {
                            path: parsedCookie.path,
                            // other options
                        });
                    });
                }),
                map(response => ({
                    token,
                    ...response.data
                }))
            );
    }
}


