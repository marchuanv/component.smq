import { Message, Properties, randomUUID } from './registry.mjs';
export class QueueItem extends Properties {
    /**
     * @param { Message } message
    */
    constructor(message) {
        super();
        super.set('Id', randomUUID());
        super.set('message', message);
        const priority = Number(process.hrtime.bigint());
        super.set('priority', priority);
    }
    get Id() {
        return super.get('Id');
    }
    get priority() {
        return super.get('priority');
    }
    get message() {
        return super.get('message');
    }
}