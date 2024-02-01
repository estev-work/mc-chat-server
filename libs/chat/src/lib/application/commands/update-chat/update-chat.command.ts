import { UpdateChatDto } from '../../dto';

export class UpdateChatCommand {
    constructor(public readonly chat: UpdateChatDto) {}
}
