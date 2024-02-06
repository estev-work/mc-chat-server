import { ChatTypeEnum } from '../value-objects';
import { IMember, IMessage } from './index';

export interface IChatRoom {
    id: string;
    name: string;
    type: ChatTypeEnum;
    creator: IMember;
    members: IMember[];
    messages: IMessage[];
}
