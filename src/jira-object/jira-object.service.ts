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
                    attributes.forEach((attribute) => {
                        const entryAttribute = entry.attributes.find(attr => attr.objectTypeAttributeId === attribute.id);
                        if (entryAttribute) res[attribute.name] = entryAttribute.objectAttributeValues[0].value;
                    });
                    
                    return {
                        avatar: entry['avatar'],
                        ...res
                    };
                })
            )
    }

    async getDashboardInfo(req: Request) {
        return await this.httpService.get('https://jira.hpcc.vn/rest/insight/1.0/iql/objects',{
            headers: {
                Cookie: `JSESSIONID=${req.cookies['JSESSIONID']}; atlassian.xsrf.token=${req.cookies['atlassian.xsrf.token']}`
            },
            params: {
                iql: 'objectTypeId=28'
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
                map(response => {
                    var idBoard = response['objectTypeAttributes'].find(obj => obj.name == "Board").id
                    var numOfMem = 0;
                    response['objectEntries'].forEach(mem => {
                        var val = mem['attributes'].find(atr => atr.objectTypeAttributeId == idBoard).objectAttributeValues[0].value 
                        if (val == "None") numOfMem++;
                    })
                    return {
                        NumOfMember: numOfMem,
                        NumOfEB: response['objectEntries'].length - numOfMem
                    }
                })
            )
    }

    async getMemberInfo(req: Request){
        return this.httpService.get('https://jira.hpcc.vn/rest/insight/1.0/iql/objects',{
            headers: {
                Cookie: `JSESSIONID=${req.cookies['JSESSIONID']}; atlassian.xsrf.token=${req.cookies['atlassian.xsrf.token']}`
            },
            params: {
                iql: "objectTypeId=28"  
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
                map(response => {
                    var entry = response['objectEntries'].filter(res => res['objectType']['name'] === "BDC MEMBER")
                    var res = [];
                    entry.forEach(mem => {
                        const attributes = response.objectTypeAttributes;
                        var entryInfo = {};
                        entryInfo['avatar'] = mem['avatar'];
                        attributes.forEach(attribute => {
                            const entryAttribute = mem.attributes.find(attr => attr.objectTypeAttributeId === attribute.id);
                            if (entryAttribute) entryInfo[attribute.name] = entryAttribute.objectAttributeValues[0].value;
                        });
                        //console.log(mem['avatar']);
                        res.push(entryInfo);
                    })
                    return res;
                })
            )
    }
}
