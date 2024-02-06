import { IChatRoom } from '../../domain';

export type UpdateChatDto = Partial<Pick<IChatRoom, 'name'>> &
    Pick<IChatRoom, 'id'>;
