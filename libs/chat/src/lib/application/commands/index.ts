import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommandHandler } from './create-chat/create-chat.command-handler';
import { UpdateChatCommandHandler } from './update-chat/update-chat.command-handler';
import { DeleteChatCommandHandler } from './delete-chat/delete-chat.command-handler';

export const CHAT_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
    CreateChatCommandHandler,
    UpdateChatCommandHandler,
    DeleteChatCommandHandler,
];
