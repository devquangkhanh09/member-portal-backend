import { Module } from '@nestjs/common';
import { JiraObjectService } from './jira-object.service';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    }),
  ],
  providers: [JiraObjectService],
  exports: [JiraObjectService]
})
export class JiraObjectModule {}
