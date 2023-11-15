import { Message } from "./registry.mjs";
export class MessageFactory {
    /**
     * @param { String } text
     * @returns { Message }
    */
    static create(text) {
        return new Message(text);
    }
}