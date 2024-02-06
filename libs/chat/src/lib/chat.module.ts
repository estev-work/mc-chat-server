import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import {
    CHAT_COMMANDS_HANDLERS,
    CHAT_EVENTS_HANDLERS,
    CHAT_QUERIES_HANDLERS,
    ChatRoomFacade,
} from './application';
import {
    chatRoomFacadeFactory,
    ChatRoomRepository,
    ChatRoomTypeormAdapter,
    ENTITIES,
} from './infrastructure';
import { ProvidersModule } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        CqrsModule,
        ProvidersModule,
        TypeOrmModule.forFeature([...ENTITIES]),
    ],
    providers: [
        ...CHAT_COMMANDS_HANDLERS,
        ...CHAT_QUERIES_HANDLERS,
        ...CHAT_EVENTS_HANDLERS,
        {
            provide: ChatRoomFacade,
            inject: [CommandBus, QueryBus, EventBus],
            useFactory: chatRoomFacadeFactory,
        },
        {
            provide: ChatRoomRepository,
            useClass: ChatRoomTypeormAdapter,
        },
    ],
    exports: [ChatRoomFacade],
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
