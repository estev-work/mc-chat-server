import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ChatRoomAggregate } from './chat-room.aggregate';
import { User } from './user';

export class Message {
    public readonly id: string = randomStringGenerator();
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
