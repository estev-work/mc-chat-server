import { ChatRoomAggregate } from '../model';
import { Role } from '../value-objects';
import { IUser } from './index';

export interface IMember {
    id: string;
    chatRoom: ChatRoomAggregate;
    user: IUser;
    role: Role;
}
