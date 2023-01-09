import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JiraObjectService } from 'src/jira-object/jira-object.service';

@Injectable()
export class UserService {
    constructor(private readonly jiraObjectService: JiraObjectService) {}

    async getUserProfile(req: Request) {    
        return this.jiraObjectService.getUserProfile(req);
    }

    async getDashboardInfo(req: Request) {
        return this.jiraObjectService.getDashboardInfo(req);
    }
}
