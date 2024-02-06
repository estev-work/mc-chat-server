import { ChatRoomAggregate, IChatRoom } from '../../domain';

export abstract class ChatRoomRepository {
    abstract save(chatRoom: IChatRoom): Promise<ChatRoomAggregate>;

    abstract findOne(id: string): Promise<ChatRoomAggregate | null>;

    abstract findAll(): Promise<[ChatRoomAggregate[], number]>;

    abstract delete(id: string): Promise<boolean>;
}
