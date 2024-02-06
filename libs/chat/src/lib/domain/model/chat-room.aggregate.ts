import { Member } from './member';
import { Message } from './message';
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
import { ChatTypeEnum } from '../value-objects';
import { IChatRoom } from '../interfaces';
import { v4 as uuid } from 'uuid';

export class ChatRoomAggregate extends ChatRoomServices {
    @IsUUID(4)
    id: string = uuid();

    @IsString()
    @IsNotEmpty()
    name = 'unknown';

    @IsEnum(ChatTypeEnum)
    type: ChatTypeEnum = ChatTypeEnum.personal;

    @IsNotEmpty()
    creator: Member = Member.create({});

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
