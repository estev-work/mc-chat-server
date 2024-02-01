import { IChatRoom } from '../../domain';

export type CreateChatDto = Pick<IChatRoom, 'name' | 'type' | 'members'>;
