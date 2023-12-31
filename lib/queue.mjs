import { CtorParam } from 'component.properties';
import { Connection, Message, MessageFactory, Properties } from '../registry.mjs';
export class Queue extends Properties {
    /**
     * @param { Connection } connection
    */
    constructor(connection) {
        super([new CtorParam('connection', connection, true, true, true)]);
        super.set({ incomingQueue: [] }, true, false);
        super.set({ outgoingQueue: [] }, true, false);
        super.set({ queue: [] }, true, false);
        const incomingQueue = super.get({ incomingQueue: null }, [Message.prototype]);
        const outgoingQueue = super.get({ outgoingQueue: null }, [Message.prototype]);
        const queue = super.get({ queue: null }, [Message.prototype]);
        const _sendReceive = () => {
            connection.receive().then(({ serverMessage }) => {
                if (serverMessage) {
                    const { body, headers } = serverMessage || {};
                    if (body, headers) {
                        const { data } = body;
                        let { priority } = headers;
                        priority = Number(priority);
                        console.log('pushing received server message into the queue');
                        const message = MessageFactory.create(data, priority);
                        incomingQueue.push(message);
                        queue.push(message);
                    } else {
                        console.error(new Error('malformed server message received.'));
                    }
                }
            }).catch((error) => {
                console.error(error);
            });
            const message = outgoingQueue.shift();
            if (message) {
                const index = queue.findIndex(msg => msg.body.Id === message.body.Id);
                if (index === -1) {
                    throw new Error('critical error');
                }
                queue.splice(index, 1);
                const messageToSendStr = message.serialise();
                const _messageToSend = JSON.parse(messageToSendStr);
                _messageToSend.body.data = _messageToSend.body.text;
                delete _messageToSend.body.text;
                connection.send(_messageToSend);
            }
            setTimeout(_sendReceive, 100);
        };
        _sendReceive();
    }
    /**
     * @param { Message } message
    */
    enqueue(message) {
        const outgoingQueue = super.get({ outgoingQueue: null }, [Message.prototype]);
        outgoingQueue.push(message);
        sortQueues.call(this);
        const queue = super.get({ queue: null });
        queue.push(message);
    }
    /**
     * @returns { Message }
    */
    dequeue() {
        const incomingQueue = super.get({ incomingQueue: null }, [Message.prototype]);
        sortQueues.call(this);
        const message = incomingQueue.shift();
        const queue = super.get({ queue: null });
        const index = queue.findIndex(msg => msg.body.Id === message.body.Id);
        if (index === -1) {
            throw new Error('critical error');
        }
        queue.splice(index, 1);
        return message;
    }
    /**
     * @returns { Message }
    */
    peek() {
        const queue = super.get({ queue: null });
        return queue[0];
    }
    /**
     * @returns { Number }
    */
    get count() {
        const queue = super.get({ queue: null });
        return queue.length;
    }
    /**
     * @returns { Queue }
    */
    static ctor() {

    }
}
function sortQueues() {
    const incomingQueue = this.get({ incomingQueue: null }, [Message.prototype]);
    const outgoingQueue = this.get({ outgoingQueue: null }, [Message.prototype]);
    const queue = this.get({ queue: null }, [Message.prototype]);
    const sortedIncomingQueue = sortQueue.call(this, incomingQueue);
    const sortedOutgoingQueue = sortQueue.call(this, outgoingQueue);
    const sortedQueue = sortQueue.call(this, queue);
    this.set({ incomingQueue: sortedIncomingQueue });
    this.set({ outgoingQueue: sortedOutgoingQueue });
    this.set({ queue: sortedQueue });
}
function sortQueue(queue) {
    return queue.sort((msg1, msg2) => {
        if (msg1.headers.priority > msg2.headers.priority) {
            return 1;
        } else if (msg1.headers.priority === msg2.headers.priority) {
            if (msg1.headers.time > msg2.headers.time) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    });
}