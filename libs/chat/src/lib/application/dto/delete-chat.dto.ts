import { IChatRoom } from '../../domain';

export type DeleteChatDto = Pick<IChatRoom, 'id'>;
