import { Member } from './member';
import { Message } from './message';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsUUID,
    validateSync,
} from 'class-validator';
import { ChatRoomServices } from '../services';
import { DomainError } from '@common/errors/domain.error';
import { ChatType } from '../value-objects';
import { IChatRoom } from '../interfaces';

export class ChatRoomAggregate extends ChatRoomServices {
    @IsUUID()
    id: string = randomStringGenerator();

    @IsString()
    @IsNotEmpty()
    name = 'unknown';

    @IsEnum(ChatType)
    type: ChatType = ChatType.personal;

    @IsNotEmpty()
    creator!: Member;

    @IsArray()
    members: Member[] = [];

    @IsArray()
    messages: Message[] = [];

    lastMessageData: string | null = null;

    private constructor() {
        super();
    }

    public static create(chatRoom: Partial<IChatRoom>) {
        const _chatRoom = new ChatRoomAggregate();
        const error = validateSync(_chatRoom, { whitelist: true });
        if (error.length) {
            throw new DomainError(error, 'Chat not valid');
        }
        return Object.assign(_chatRoom, chatRoom);
    }
}
