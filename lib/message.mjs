import { MessageBody, Properties } from './registry.mjs';
export class Message extends Properties {
    /**
     * @param { String } text
     */
    constructor(text) {
        super();
        super.set('headers', {});
        super.set('body', new MessageBody(text));
    }
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