import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as https from 'https';

@Module({
  imports: [HttpModule.register({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
