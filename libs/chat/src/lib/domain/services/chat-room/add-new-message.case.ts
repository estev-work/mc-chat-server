import { ChatRoomAggregate, Message } from '../../model';

export interface IAddNewMessageCase {
    addNewMessage(message: Message): void;
}

export const ADD_NEW_MESSAGE = async function (
    this: ChatRoomAggregate,
    message: Message,
) {
    this.messages.push(message);
    this.lastMessageData = new Date().toISOString();
};
