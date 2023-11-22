import { MessageBody, MessageHeaders, MessagePriority, Properties } from '../registry.mjs';
export class Message extends Properties {
    /**
     * @param { String } text
     * @param { MessagePriority } priority
     * @param { Number } time
    */
    constructor(text, priority, time) {
        super();
        super.set({ headers: new MessageHeaders(priority, time) }, true, true);
        super.set({ body: new MessageBody(text) }, true, true);
    }
    /**
     * @returns { MessageHeaders }
    */
    get headers() {
        return super.get({headers: null});
    }
    /**
     * @returns { MessageBody }
    */
    get body() {
        return super.get({body: null});
    }
}