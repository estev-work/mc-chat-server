import { ChatRoomAggregate } from './chat-room.aggregate';
import { User } from './user';
import { v4 as uuid } from 'uuid';

export class Message {
    public readonly id: string = uuid();
    public chatRoom!: ChatRoomAggregate;
    public user!: User;
    public text: string;

    private constructor() {
        this.text = '';
    }

    public static create(message: Partial<Message>) {
        const _message = new Message();
        return Object.assign(_message, message);
    }
}
