import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChatCommand } from './delete-chat.command';
import { ChatRoomAggregate, ChatRoomRepository } from '../../../domain';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(DeleteChatCommand)
export class DeleteChatCommandHandler
    implements ICommandHandler<DeleteChatCommand, boolean>
{
    private readonly logger = new Logger();

    constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

    async execute({ chat }: DeleteChatCommand): Promise<boolean> {
        const existChat = await this.chatRoomRepository
            .findOne(chat.id)
            .catch((err: Error) => {
                this.logger.error(err);
                return null as unknown as ChatRoomAggregate;
            });
        if (!existChat) {
            throw new BadRequestException(`Chat by id ${chat.id} not found`);
        }
        return await this.chatRoomRepository
            .delete(existChat.id)
            .catch((err: Error) => {
                throw new BadRequestException(err.message);
            });
    }
}
