import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TestSchema } from './schema';

@Injectable()
export class UserService {
    // TO-DO: implement getUserProfile to return an object of UserSchema
    async getUserProfile(req: Request): Promise<TestSchema> {
        return {
            key: "test",
            name: "test",
            title: "test",
            status: "test",
            quantity: 0,
            type: "test",
            position: "test",
            borrowed: "test",
        }
    }
}
