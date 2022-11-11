import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JiraObjectModule } from './jira-object/jira-object.module';

@Module({
  imports: [UserModule, JiraObjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
