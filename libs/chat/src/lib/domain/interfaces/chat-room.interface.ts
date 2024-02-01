import { ChatType } from '../value-objects/chat-type.vo';
import { IMember, IMessage } from './index';

export interface IChatRoom {
    id: string;
    name: string;
    type: ChatType;
    creator: IMember;
    members: IMember[];
    messages: IMessage[];
}
