import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

export const CHAT_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
