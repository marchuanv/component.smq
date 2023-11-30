import { CtorParam } from 'component.properties';
import { MessagePriority, Properties } from '../registry.mjs';
export class MessageHeaders extends Properties {
    /**
     * @param { MessagePriority } priority
     * @param { Number } time
    */
    constructor(priority, time) {
        super([
<<<<<<< HEAD
            new CtorParam('priority', 'priority.value', true, true, )
        ]);
        super.set('priority', priority.value, true, true);
        super.set('time', time, false, true);
=======
            new CtorParam('priority', priority.value, true, true, false),
            new CtorParam('time', time, false, true, false)
        ]);
>>>>>>> 7bdb457d9307bcc1e7bbcd4fb137eab32e54c315
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
    /**
     * @returns { MessageHeaders }
    */
    static ctor() {

    }
}