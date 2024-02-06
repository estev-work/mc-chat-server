import { ChatRoomAggregate, IChatRoom } from '../../domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../database/entities/chat-room.entity';
import { Repository } from 'typeorm';
import { ChatRoomRepository } from './chat-room.repository';

@Injectable()
export class ChatRoomTypeormAdapter implements ChatRoomRepository {
    private readonly logger: Logger = new Logger(ChatRoomTypeormAdapter.name);

    constructor(
        @InjectRepository(ChatRoomEntity)
        private readonly chatRoomRepository: Repository<ChatRoomEntity>,
    ) {}

    async delete(id: string): Promise<boolean> {
        const deleteResult = await this.chatRoomRepository
            .delete(id)
            .catch((err: Error) => {
                this.logger.error(err);
                return false;
            });
        return !!deleteResult;
    }

    async findAll(): Promise<[ChatRoomAggregate[], number]> {
        const [entities, count] = await this.chatRoomRepository.findAndCount(
            {},
        );
        if (!count) return [[], 0];
        return [
            entities.map((value) => ChatRoomAggregate.create(value)),
            count,
        ];
    }

    async findOne(id: string): Promise<ChatRoomAggregate | null> {
        const existChatRoom = await this.chatRoomRepository
            .findOneBy({ id })
            .catch((err) => {
                this.logger.error(err);
                return null;
            });
        if (!existChatRoom) {
            return null;
        }
        return ChatRoomAggregate.create(existChatRoom);
    }

    async save(chatRoom: IChatRoom): Promise<ChatRoomAggregate> {
        console.log(chatRoom);
        if (chatRoom?.id) {
            const existChatRoom = await this.findOne(chatRoom.id);
            if (existChatRoom) {
                const { id, ...toUpdate } = chatRoom;
                await this.chatRoomRepository
                    .update({ id }, toUpdate)
                    .catch((err: Error) => {
                        this.logger.error(
                            `Chat room ${chatRoom.id} saved fail. Error:${err.message}`,
                        );
                        throw new Error(`Chat room ${chatRoom.id} saved fail.`);
                    });
                const savedChatRoom = await this.findOne(chatRoom.id);
                if (savedChatRoom) return savedChatRoom;
                throw new Error(
                    `Chat room ${chatRoom.id} get after save fail.`,
                );
            }
        }
        const savedChatRoom = await this.chatRoomRepository.save(chatRoom);
        return ChatRoomAggregate.create(savedChatRoom);
    }
}
