import { CtorParam } from 'component.properties';
import { Properties, randomUUID } from '../registry.mjs';
export class MessageBody extends Properties {
    /**
     * @param { String } text
     */
    constructor(text) {
        super([new CtorParam('text', text, true, true, false)]);
        super.set({ Id: randomUUID() }, true, true);
    }
    /**
     * @returns { String }
    */
    get Id() {
        return super.get({ Id: null });
    }
    /**
     * @returns { Object }
    */
    get text() {
        return super.get({ text: null });
    }
    /**
     * @returns { MessageBody }
    */
    static ctor() {

    }
}