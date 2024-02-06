import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateChatCommand } from './commands/create-chat/create-chat.command';
import { CreateChatDto } from './dto';
import { CreateChatCommandHandler } from './commands/create-chat/create-chat.command-handler';

@Injectable()
export class ChatRoomFacade {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) {}

    command = {
        crateChatRoom: (chat: CreateChatDto) => this.createChatRoom(chat),
    };
    query = {};
    events = {};

    createChatRoom(chat: CreateChatDto) {
        return this.commandBus.execute<
            CreateChatCommand,
            CreateChatCommandHandler['execute']
        >(new CreateChatCommand(chat));
    }
}
