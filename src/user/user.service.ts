import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, throwError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService) {}

    // TO-DO: implement getUserProfile to return an object of UserSchema
    async getUserProfile(req: Request) {
        return this.httpService.get('https://jira.hpcc.vn/rest/insight/1.0/object/HPCCINFRA-21', {
            headers: {
                Cookie: `JSESSIONID=${req.cookies['JSESSIONID']}; atlassian.xsrf.token=${req.cookies['atlassian.xsrf.token']}`
            }
        })
            .pipe(
                catchError(err => throwError(() => new HttpException('cannot retrieve object', 400))),
                map(response => response.data)
            )
    }
}
