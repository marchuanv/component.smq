import { Connection, ConnectionOptions } from 'component.communication';
import { Properties } from 'utils';
import { MessageHeaders } from './message.headers.mjs';
import { MessagePriority } from './message.priority.mjs';
export { HttpConnection } from 'component.communication/lib/registry.mjs';
export { EventEmitter } from 'events';
export { randomUUID } from 'node:crypto';
export { Stream } from 'node:stream';
export { Queue } from '../lib/queue.mjs';
export { MessageBody } from './message.body.mjs';
export { MessageFactory } from './message.factory.mjs';
export { Message } from './message.mjs';
export { Connection, ConnectionOptions, MessageHeaders, MessagePriority, Properties };

