import { Connection, ConnectionOptions, MessageFactory, MessagePriority, Queue } from '../lib/registry.mjs';
const suite = fdescribe('when ', () => {
    it('should ', async () => {
        const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
        const connection = new Connection(connectionOptions);
        const queue = new Queue(connection);
        const newMessage = MessageFactory.create('Hello World', MessagePriority.High);
        await queue.enqueue(newMessage);
        const message = await queue.dequeue();
        expect(Number(message.headers.priority)).toBe(newMessage.headers.priority);
        expect(message.body.Id).toBe(newMessage.body.Id);
        expect(message.body.data).toBe(newMessage.body.data);
    });
});
process.specs.set(suite, []);