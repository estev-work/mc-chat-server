import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const CHAT_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
