import { Connection, Message, Properties } from './registry.mjs';
export class Queue extends Properties {
    /**
     * @param { Connection } connection
    */
    constructor(connection) {
        super();
        super.set('connection', connection);
        super.set('queue', new Array());
    }
    /**
     * @param { Message } message
    */
    async enqueue(message) {
        const connection = this.get('connection');
        const messageToSendStr = message.serialise();
        const _messageToSend = JSON.parse(messageToSendStr);
        connection.send(_messageToSend);
        const { serverMessage } = await connection.receive();
        const queue = this.get('queue');
        queue.push(serverMessage);
    }
    /**
     * @returns { Message }
    */
    async dequeue() {
        const queue = this.get('queue');
        const rawMessage = queue.shift();
        const message = Message.create(rawMessage);
        return message;
    }
}