import { AuthGuard } from '@nestjs/passport';

export class LdapGuard extends AuthGuard('ldap'){ }