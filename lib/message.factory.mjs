import { Message } from "./registry.mjs";
export class MessageFactory {
    /**
     * @param { String } text
     * @returns { Message }
    */
    static create(text) {
        if (isUTF8(text)) {
            return new Message(text);
        } else {
            throw new Error('text is not utf8');
        }
    }
}

function isUTF8(text) {
    let utf8Text = text;
    try {
        utf8Text = decodeURIComponent(text);
        return false
    } catch {
        return true;
    }
}