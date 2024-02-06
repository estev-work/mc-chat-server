import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChatCommand } from './update-chat.command';
import { ChatRoomAggregate } from '../../../domain';
import { BadRequestException, Logger } from '@nestjs/common';
import { ChatRoomRepository } from '../../../infrastructure';

@CommandHandler(UpdateChatCommand)
export class UpdateChatCommandHandler
    implements ICommandHandler<UpdateChatCommand, ChatRoomAggregate>
{
    private readonly logger = new Logger();

    constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

    async execute({ chat }: UpdateChatCommand): Promise<ChatRoomAggregate> {
        const existChat = await this.chatRoomRepository
            .findOne(chat.id)
            .catch((err: Error) => {
                this.logger.error(err);
                return null as unknown as ChatRoomAggregate;
            });
        if (!existChat) {
            throw new BadRequestException(`Chat by id ${chat.id} not found`);
        }
        Object.assign(existChat, chat);
        const chatRoomAggregate = ChatRoomAggregate.create(existChat);
        return await this.chatRoomRepository
            .save(chatRoomAggregate)
            .catch((err: Error) => {
                throw new BadRequestException(err.message);
            });
    }
}
