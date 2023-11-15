import { MessageBody, MessageHeaders, MessagePriority, Properties } from './registry.mjs';
export class Message extends Properties {
    /**
     * @param { String } text
     * @param { MessagePriority } priority
    */
    constructor(text, priority) {
        super();
        super.set('headers', new MessageHeaders(priority));
        super.set('body', new MessageBody(text));
    }
    /**
     * @returns { MessageHeaders }
    */
    get headers() {
        return super.get('headers');
    }
    /**
     * @returns { MessageBody }
    */
    get body() {
        return super.get('body');
    }
}