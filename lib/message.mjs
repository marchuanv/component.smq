import { Properties } from './registry.mjs';
export class Message extends Properties {
    /**
     * @param { String } text_utf8
     */
    constructor(text_utf8) {
        super();
        super.text = text_utf8;
    }
}