import { Connection, Message, Properties } from './registry.mjs';
export class Queue extends Properties {
    /**
     * @param { Connection } connection
    */
    constructor(connection) {
        super({ name: 'connection', value: connection });
        super.set('incomingQueue', []);
        super.set('outgoingQueue', []);
        super.set('queue', []);
        const incomingQueue = super.get('incomingQueue', [Message.prototype]);
        const outgoingQueue = super.get('outgoingQueue', [Message.prototype]);
        const queue = super.get('queue', [Message.prototype]);
        const _sendReceive = () => {
            connection.receive().then(({ serverMessage }) => {
                if (serverMessage) {
                    console.log('pushing received server message into the queue');
                    const message = Message.create(serverMessage);
                    incomingQueue.push(message);
                    queue.push(message)
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
        const outgoingQueue = super.get('outgoingQueue', [Message.prototype]);
        outgoingQueue.push(message);
        sortQueues.call(this);
        const queue = super.get('queue');
        queue.push(message);
    }
    /**
     * @returns { Message }
    */
    dequeue() {
        const incomingQueue = super.get('incomingQueue', [Message.prototype]);
        sortQueues.call(this);
        const message = incomingQueue.shift();
        const queue = super.get('queue');
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
        const queue = super.get('queue');
        return queue[0];
    }
    /**
     * @returns { Number }
    */
    get count() {
        const queue = super.get('queue');
        return queue.length;
    }
}
function sortQueues() {
    const incomingQueue = this.get('incomingQueue', [Message.prototype]);
    const outgoingQueue = this.get('outgoingQueue', [Message.prototype]);
    const queue = this.get('queue', [Message.prototype]);
    const sortedIncomingQueue = sortQueue.call(this, incomingQueue);
    const sortedOutgoingQueue = sortQueue.call(this, outgoingQueue);
    const sortedQueue = sortQueue.call(this, queue);
    this.get('incomingQueue', sortedIncomingQueue);
    this.get('outgoingQueue', sortedOutgoingQueue);
    this.get('queue', sortedQueue);
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