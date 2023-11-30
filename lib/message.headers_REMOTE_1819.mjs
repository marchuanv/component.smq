import { CtorParam } from 'component.properties';
import { MessagePriority, Properties } from '../registry.mjs';
export class MessageHeaders extends Properties {
    /**
     * @param { MessagePriority } priority
     * @param { Number } time
    */
    constructor(priority, time) {
        super([
            new CtorParam('priority', priority.value, true, true, false),
            new CtorParam('time', time, false, true, false)
        ]);
    }
    /**
     * @returns { Number }
    */
    get priority() {
        return super.get({ priority: null });
    }
    /**
     * @returns { Number }
    */
    get time() {
        return super.get({ time: null });
    }
}