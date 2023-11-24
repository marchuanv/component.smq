import { Message, MessagePriority } from "../registry.mjs";
export class MessageFactory {
    /**
     * @param { String } text
     * @param { MessagePriority } priority
     * @returns { Message }
    */
    static create(text, priority) {
        const time = Number(process.hrtime.bigint());
        let _priority = priority;
        if (!(_priority instanceof MessagePriority)) {
            _priority = Number(_priority);
            _priority = MessagePriority.get(_priority)
        }
        return new Message(text, _priority, time);
    }
}