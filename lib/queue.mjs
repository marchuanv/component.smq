import { Connection, Message, Properties } from './registry.mjs';
export class Queue extends Properties {
    /**
     * @param { Connection } connection
    */
    constructor(connection) {
        super();
        super.set('connection', connection);
        super.set('queue', new Array());
        const _receive = () => {
            connection.receive().then(({ serverMessage }) => {
                if (serverMessage) {
                    const queue = this.get('queue');
                    const message = Message.create(serverMessage);
                    queue.push(message);
                }
                _receive();
            }).catch((error) => {
                console.error(error);
            });
        };
        _receive();
    }
    /**
     * @param { Message } message
    */
    enqueue(message) {
        const connection = this.get('connection');
        const messageToSendStr = message.serialise();
        const _messageToSend = JSON.parse(messageToSendStr);
        connection.send(_messageToSend);
    }
    /**
     * @returns { Message }
    */
    dequeue() {
        const queue = this.get('queue');
        return queue.shift();
    }
}