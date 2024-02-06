import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ChatRoomFacade } from '../../application/chat-room-facade.service';

export const chatRoomFacadeFactory = (
    commandBus: CommandBus,
    queryBus: QueryBus,
    eventBus: EventBus,
) => new ChatRoomFacade(commandBus, queryBus, eventBus);
