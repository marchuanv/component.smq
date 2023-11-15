import { Connection, Message, Properties } from './registry.mjs';
export class Queue extends Properties {
    /**
     * @param { Connection } connection
     */
    constructor(connection) {
        super();
        super.set('connection', connection);
    }
    /**
     * @param { Message } message
    */
    async enqueue(message) {
        const connection = this.get('connection');
        return await connection.send(message);
    }
    /**
     * @returns { Message }
    */
    async dequeue() {
        const connection = this.get('connection');
        return await connection.send(message);
    }
}