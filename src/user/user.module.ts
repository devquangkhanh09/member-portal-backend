import { Module } from '@nestjs/common';
import { JiraObjectModule } from 'src/jira-object/jira-object.module';
import { JiraObjectService } from 'src/jira-object/jira-object.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JiraObjectModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
