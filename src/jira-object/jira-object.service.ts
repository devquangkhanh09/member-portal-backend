import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class JiraObjectService {
    constructor(private readonly httpService: HttpService) {}

    async getUserProfile(req: Request) {
        return this.httpService.get('https://jira.hpcc.vn/rest/insight/1.0/iql/objects', {
            headers: {
                Cookie: `JSESSIONID=${req.cookies['JSESSIONID']}; atlassian.xsrf.token=${req.cookies['atlassian.xsrf.token']}`
            },
            params: {
                iql: `label=${req.user}`
            }
        })
            .pipe(
                catchError(err => throwError(() => new HttpException('Jira: cannot retrieve object', 400))),
                tap(response => {
                    if (response.data.objectEntries.length === 0) {
                        throw new HttpException('Jira: object not found', 404);
                    }
                }),
                map(response => response.data),
                map(data => {
                    const entry = data.objectEntries[0];
                    const attributes = data.objectTypeAttributes;
                    
                    const res = {};
                    attributes.forEach((attribute, idx) => {
                        res[attribute['name']] = entry['attributes'][idx]['objectAttributeValues'][0]['value'];
                    });
                    
                    return {
                        avatar: entry['avatar'],
                        ...res
                    };
                })
            )
    }
}
