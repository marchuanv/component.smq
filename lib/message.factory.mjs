import { Message, MessagePriority } from "../registry.mjs";
export class MessageFactory {
    /**
     * @param { String } text
     * @param { MessagePriority } priority
     * @returns { Message }
    */
    static create(text, priority) {
        const time = Number(process.hrtime.bigint());
        return new Message(text, priority, time);
    }
}