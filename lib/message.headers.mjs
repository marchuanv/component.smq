import { MessagePriority, Properties } from './registry.mjs';
export class MessageHeaders extends Properties {
    /**
     * @param { MessagePriority } priority
    */
    constructor(priority) {
        super();
        super.set('priority', priority.value);
    }
    /**
     * @returns { Number }
    */
    get priority() {
        return super.get('priority');
    }
    /**
     * @param { Number } value
    */
    set priority(value) {
        super.set('priority', value);
    }
}