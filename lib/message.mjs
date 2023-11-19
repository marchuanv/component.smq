import { MessageBody, MessageHeaders, MessagePriority, Properties } from '../registry.mjs';
export class Message extends Properties {
    /**
     * @param { String } text
     * @param { MessagePriority } priority
     * @param { Number } time
    */
    constructor(text, priority, time) {
        super();
        super.set('headers', new MessageHeaders(priority, time));
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
    /**
     * @param { Object } message
    */
    static create(message) {
        const { priority, time } = message.headers;
        const messagePriority = MessagePriority.get(Number(priority));
        const _message = new Message(message.body.data, messagePriority, time);
        _message.body.set('Id', message.body.Id);
        return _message;
    }
}