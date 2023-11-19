import { Connection, ConnectionOptions, HttpConnection } from 'component.communication';
import { Properties } from 'component.properties';
import { Specs } from 'utils'
import { MessageHeaders } from './lib/message.headers.mjs';
import { MessagePriority } from './lib/message.priority.mjs';
export { EventEmitter } from 'events';
export { randomUUID } from 'node:crypto';
export { Queue } from './lib/queue.mjs';
export { MessageBody } from './lib/message.body.mjs';
export { MessageFactory } from './lib/message.factory.mjs';
export { Message } from './lib/message.mjs';
export { Connection, ConnectionOptions, MessageHeaders, MessagePriority, Properties, HttpConnection, Specs };