import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, tap, throwError } from 'rxjs';
import { JiraObjectService } from 'src/jira-object/jira-object.service';

@Injectable()
export class UserService {
    constructor(private readonly jiraObjectService: JiraObjectService) {}

    // TO-DO: combine with jwt strategy (replace username in req.query)
    async getUserProfile(req: Request) {    
        return this.jiraObjectService.getUserProfile(req);
    }
}
