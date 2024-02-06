import { ChatRoomAggregate, ChatRoomRepository, IChatRoom } from '../../domain';
import { Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../database/entities/chat-room.entity';
import { Repository } from 'typeorm';

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

    async findOne(id: string): Promise<ChatRoomAggregate> {
        const existChatRoom = await this.chatRoomRepository
            .findOneBy({ id })
            .catch((err) => {
                this.logger.error(err);
                return null;
            });
        if (!existChatRoom) {
            throw new NotFoundException(`Chat room ${id} not found`);
        }
        return ChatRoomAggregate.create(existChatRoom);
    }

    async save(chatRoom: IChatRoom): Promise<ChatRoomAggregate> {
        if (chatRoom?.id) {
            const existChatRoom = await this.findOne(chatRoom.id);
            if (!existChatRoom) {
                throw new NotFoundException(
                    `Chat room ${chatRoom.id} not found`,
                );
            }
            const { id, ...toUpdate } = chatRoom;
            await this.chatRoomRepository
                .update({ id }, toUpdate)
                .catch((err: Error) => {
                    this.logger.error(
                        `Chat room ${chatRoom.id} saved fail. Error:${err.message}`,
                    );
                    throw new Error(`Chat room ${chatRoom.id} saved fail.`);
                });
            return await this.findOne(chatRoom.id);
        }
        const savedChatRoom = await this.chatRoomRepository.save(chatRoom);
        return ChatRoomAggregate.create(savedChatRoom);
    }
}
