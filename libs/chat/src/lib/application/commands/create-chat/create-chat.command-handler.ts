import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommand } from './create-chat.command';
import { ChatRoomAggregate } from '../../../domain';
import { BadRequestException } from '@nestjs/common';
import { ChatRoomRepository } from '../../../infrastructure';

@CommandHandler(CreateChatCommand)
export class CreateChatCommandHandler
    implements ICommandHandler<CreateChatCommand, ChatRoomAggregate>
{
    constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

    async execute({ chat }: CreateChatCommand): Promise<ChatRoomAggregate> {
        const chatRoomAggregate = ChatRoomAggregate.create(chat);
        return await this.chatRoomRepository
            .save(chatRoomAggregate)
            .catch((err: Error) => {
                throw new BadRequestException(err.message);
            });
    }
}
