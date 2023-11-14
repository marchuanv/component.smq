import { Message } from "./registry.mjs";
export class MessageFactory {
    /**
     * @param { String } text_utf8
     * @returns { Message }
     */
    static create(text_utf8) {
        return new Message();
    }
}