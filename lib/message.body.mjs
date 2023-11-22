import { Properties, randomUUID } from '../registry.mjs';
export class MessageBody extends Properties {
    /**
     * @param { String } text
     */
    constructor(text) {
        super();
        super.set({ Id: randomUUID() }, true, true);
        super.set({ data: text }, false, true);
    }
    /**
     * @returns { String }
    */
    get Id() {
        return super.get('Id');
    }
    /**
     * @returns { Object }
    */
    get data() {
        return super.get('data');
    }
}