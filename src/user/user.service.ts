import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, throwError } from 'rxjs';

@Injectable()
export class UserService {
    private cookies;
    private book;
    constructor(private readonly httpService: HttpService) {}

    // TO-DO: implement getUserProfile to return an object of UserSchema
    async getIDByName(name: string) {

        return await this.httpService.get('https://jira.hpcc.vn/rest/insight/1.0/iql/objects',{
            headers: {
                Cookie: `JSESSIONID=${this.cookies['JSESSIONID']}; atlassian.xsrf.token=${this.cookies['atlassian.xsrf.token']}`
            }
        })
            .pipe(
                catchError(err => throwError(() => new HttpException('cannot retrieve object', 400))),
                map(response => response.data['objectEntries']),
                map(response => response.filter(res => res['objectType']['name'] === "HPC LIBRARY")),
                map(response => response.filter(res => res['label'] === name)),
                map(response => response[0]['id'])
            )
    }

    async getInfoByID(ID) {
        var tmp = await this.httpService.get(`https://jira.hpcc.vn/rest/insight/1.0/object/${ID}/attributes`, {
            headers: {
                Cookie: `JSESSIONID=${this.cookies['JSESSIONID']}; atlassian.xsrf.token=${this.cookies['atlassian.xsrf.token']}`
            }
        })
            .pipe(
                catchError(err => throwError(() => new HttpException('cannot retrieve object', 400))),
                map(response => response.data),
                map(response => {
                    var result = {};
                    response.forEach(element => {
                    result[element['objectTypeAttribute']['name']] = element['objectAttributeValues'][0]['value'];
                })
                return result;
            })
            )
        
        tmp.subscribe(val => {
            this.book = val;
            console.log(this.book);
        })
    }

    async getUserProfile(req: Request) {
        /*if (req.cookies == undefined){
            return new HttpException('cannot retrieve object', 400);
        }*/
        this.cookies = req.cookies;
        var ID = this.getIDByName(req.body.username);
        (await ID).subscribe(val => this.getInfoByID(val));
    }
}
