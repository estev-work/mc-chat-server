import { AggregateRoot } from '@nestjs/cqrs';
import { ADD_NEW_MESSAGE, IAddNewMessageCase } from './chat-room';

export class ChatRoomServices extends AggregateRoot implements IAddNewMessageCase {
    addNewMessage = ADD_NEW_MESSAGE;
}
