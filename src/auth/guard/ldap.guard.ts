import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LdapStrategy } from '../strategy/ldap.strategy';

@Injectable()
export class LdapGuard extends AuthGuard('ldap') {}
