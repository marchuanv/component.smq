import { MessagePriority, Properties } from '../registry.mjs';
export class MessageHeaders extends Properties {
    /**
     * @param { MessagePriority } priority
     * @param { Number } time
    */
    constructor(priority, time) {
        super();
        super.set('priority', priority.value, true, true);
        super.set('time', time, false, true);
    }
    /**
     * @returns { Number }
    */
    get priority() {
        return super.get('priority');
    }
    /**
     * @returns { Number }
    */
    get time() {
        return super.get('time');
    }
}