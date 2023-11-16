import { Connection, ConnectionOptions, MessageFactory, MessagePriority, Queue } from '../lib/registry.mjs';
const suite = describe('when queuing multiple message', () => {
    it('should sort the array by priority and message time', (done) => {
        const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
        const connection = new Connection(connectionOptions);

        const queue = new Queue(connection);

        const newMessage1 = MessageFactory.create('High Priority First', MessagePriority.High);
        const newMessage2 = MessageFactory.create('High Priority Second', MessagePriority.High);
        const newMessage5 = MessageFactory.create('Low Priority First', MessagePriority.Low);
        const newMessage6 = MessageFactory.create('Low Priority Second', MessagePriority.Low);
        const newMessage3 = MessageFactory.create('Medium Priority First', MessagePriority.Medium);
        const newMessage4 = MessageFactory.create('Medium Priority Second', MessagePriority.Medium);

        queue.enqueue(newMessage1);
        queue.enqueue(newMessage2);
        queue.enqueue(newMessage3);
        queue.enqueue(newMessage4);
        queue.enqueue(newMessage5);
        queue.enqueue(newMessage6);

        const queuedMessages = [newMessage1, newMessage2, newMessage3, newMessage4, newMessage5, newMessage6];

        setTimeout(() => {
            expect(queue.count).toBe(6);
            while (queue.peek()) {
                const message = queue.dequeue();
                const expectedMessage = queuedMessages.shift();
                expect(Number(message.headers.priority)).toBe(expectedMessage.headers.priority);
                expect(Number(message.headers.time)).toBe(expectedMessage.headers.time);
                expect(message.body.Id).toBe(expectedMessage.body.Id);
                expect(message.body.data).toBe(expectedMessage.body.data);
            }
            done();
        }, 1500);
    });
});
process.specs.set(suite, []);