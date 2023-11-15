import { Properties, randomUUID } from './registry.mjs';
export class MessageBody extends Properties {
    /**
     * @param { String } text
     */
    constructor(text) {
        super();
        super.set('Id', randomUUID());
        super.set('data', text);
    }
    get Id() {
        return super.get('Id');
    }
    get data() {
        return super.get('data');
    }
}