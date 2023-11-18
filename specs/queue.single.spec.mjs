import { Connection, HttpConnection, MessageFactory, MessagePriority, Queue } from '../lib/registry.mjs';
const suite = describe('when ', () => {
    it('should ', (done) => {
        const httpConnection = new HttpConnection(process.connectionOptions);
        const connection = new Connection(httpConnection);
        const queue = new Queue(connection);
        const newMessage = MessageFactory.create('Hello World', MessagePriority.High);
        queue.enqueue(newMessage);
        setTimeout(() => {
            const message = queue.dequeue();
            expect(Number(message.headers.priority)).toBe(newMessage.headers.priority);
            expect(Number(message.headers.time)).toBe(newMessage.headers.time);
            expect(message.body.Id).toBe(newMessage.body.Id);
            expect(message.body.data).toBe(newMessage.body.data);
            done();
        }, 1000);
    });
});
process.specs.set(suite, []);