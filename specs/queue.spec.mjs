import { Connection, ConnectionOptions, MessageFactory, MessagePriority, Queue } from '../lib/registry.mjs';
const suite = fdescribe('when ', () => {
    it('should ', (done) => {
        const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
        const connection = new Connection(connectionOptions);
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