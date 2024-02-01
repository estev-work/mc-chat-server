import { IChatRoom, IUser } from './index';

export interface IMessage {
    id: string;
    chatRoom: IChatRoom;
    user: IUser;
    text: string;
}
