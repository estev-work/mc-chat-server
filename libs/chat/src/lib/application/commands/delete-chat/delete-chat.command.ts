import { DeleteChatDto } from '../../dto/delete-chat.dto';

export class DeleteChatCommand {
    constructor(public readonly chat: DeleteChatDto) {}
}
