import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
