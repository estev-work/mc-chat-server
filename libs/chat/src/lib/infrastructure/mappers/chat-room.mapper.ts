import { ChatRoomEntity } from '../database/entities/chat-room.entity';
import { MemberEntity } from '../database/entities/member.entity';
import { MessageEntity } from '../database/entities/message.entity';
import { ChatRoomAggregate, Member, Message } from '@chat/domain';

export class ChatRoomMapper {
    static toDomain(
        chatRoomEntity: ChatRoomEntity,
        memberEntities: MemberEntity[],
        messageEntities: MessageEntity[],
    ): ChatRoomAggregate {
        return ChatRoomAggregate.create({
            id: chatRoomEntity.id,
            name: chatRoomEntity.name,
            type: chatRoomEntity.type,
            members: memberEntities.map((participant: MemberEntity) => {
                return Member.create(participant);
            }),
            messages: messageEntities.map((message: MessageEntity) => {
                return Message.create(message);
            }),
        });
    }

    static toPersistence(
        chatRoom: ChatRoomAggregate,
    ): [ChatRoomEntity, MemberEntity[], MessageEntity[]] {
        const chatRoomEntity = new ChatRoomEntity();
        chatRoomEntity.id = chatRoom.id;
        chatRoomEntity.name = chatRoom.name;
        chatRoomEntity.type = chatRoom.type;
        const memberEntities = chatRoom.members.map((model: Member) => {
            const memberEntity = new MemberEntity();
            memberEntity.id = model.id;
            memberEntity.chatRoomId = model.chatRoom.id;
            return memberEntity;
        });
        const messageEntities = chatRoom.messages.map((model: Message) => {
            const messageEntity = new MessageEntity();
            messageEntity.id = model.id;
            messageEntity.chatRoomId = model.chatRoom.id;
            messageEntity.text = model.text;
            return messageEntity;
        });
        return [chatRoomEntity, memberEntities, messageEntities];
    }
}
