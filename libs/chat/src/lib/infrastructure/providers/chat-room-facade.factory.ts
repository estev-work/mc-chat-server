import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ChatRoomFacade } from '../../application';

export const chatRoomFacadeFactory = (
    commandBus: CommandBus,
    queryBus: QueryBus,
    eventBus: EventBus,
) => new ChatRoomFacade(commandBus, queryBus, eventBus);
