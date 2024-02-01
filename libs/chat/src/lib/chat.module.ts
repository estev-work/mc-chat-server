import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import {
    CHAT_COMMANDS_HANDLERS,
    CHAT_EVENTS_HANDLERS,
    CHAT_QUERIES_HANDLERS,
    ChatFacade,
} from './application';

@Module({
    imports: [CqrsModule],
    providers: [
        ...CHAT_COMMANDS_HANDLERS,
        ...CHAT_QUERIES_HANDLERS,
        ...CHAT_EVENTS_HANDLERS,
    ],
    exports: [ChatFacade],
})
export class ChatModule implements OnModuleInit {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) {}

    onModuleInit(): void {
        this.commandBus.register(CHAT_COMMANDS_HANDLERS);
        this.queryBus.register(CHAT_QUERIES_HANDLERS);
        this.eventBus.register(CHAT_EVENTS_HANDLERS);
    }
}
