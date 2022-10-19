import * as Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';


// INFO: this strategy is currently not in use
@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
	constructor( 
	) {
		super({ 
			passReqToCallback: true,
			server: { 
				url: 'ldap://10.1.1.1:389'             ,         
				bindDN: 'uid=username,cn=users,cn=accounts,dc=supernodexp,dc=hpc',
				bindCredentials: 'password',
				searchBase: 'cn=accounts,dc=supernodexp,dc=hpc',
				searchFilter: '(uid={{username}})',
				searchAttributes: ['displayName', 'uid', 'mail'],
			},
		}, async (req: Request, user: any, done) => {
			req.user = user;
			return done(null, user);
		});
	}
}