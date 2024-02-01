import { ChatRoomAggregate } from '../model/chat-room.aggregate';
import { Role } from '../value-objects/role.vo';
import { IUser } from './index';

export interface IMember {
    id: string;
    chatRoom: ChatRoomAggregate;
    user: IUser;
    role: Role;
}
