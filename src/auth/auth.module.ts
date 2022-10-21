import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as https from 'https';
import { PassportModule } from '@nestjs/passport';
import { LdapStrategy } from './strategy/ldap.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    }),
    PassportModule.register({ 
      defaultStrategy: 'ldap',
    }),
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, LdapStrategy, LocalStrategy],
  exports: [
		PassportModule.register({ 
      defaultStrategy: 'ldap' 
    }),
	],
})
export class AuthModule {}
