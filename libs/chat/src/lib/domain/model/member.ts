import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ChatRoomAggregate } from './chat-room.aggregate';
import { User } from './user';
import { Role } from '../value-objects';
import { IsNotEmptyObject, IsUUID } from 'class-validator';

export class Member {
    @IsUUID()
    id: string = randomStringGenerator();

    @IsNotEmptyObject()
    chatRoom!: ChatRoomAggregate;

    @IsNotEmptyObject()
    user!: User;

    @IsNotEmptyObject()
    role!: Role;

    private constructor() {
        console.log('New Member Instance');
    }

    public static create(member: Partial<Member>) {
        const _member = new Member();
        return Object.assign(_member, member);
    }
}
