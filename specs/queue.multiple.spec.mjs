import { Connection, ConnectionOptions, MessageFactory, MessagePriority, Queue } from '../lib/registry.mjs';
const suite = fdescribe('when queuing multiple message', () => {
    it('should sort the array by priority and message time', (done) => {
        const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
        const connection = new Connection(connectionOptions);

        const queue = new Queue(connection);

        const newMessage1 = MessageFactory.create('Hello World 1', MessagePriority.High);
        const newMessage2 = MessageFactory.create('Hello World 2', MessagePriority.Medium);
        const newMessage3 = MessageFactory.create('Hello World 3', MessagePriority.Low);
        const newMessage4 = MessageFactory.create('Hello World 4', MessagePriority.High);

        queue.enqueue(newMessage1);
        queue.enqueue(newMessage2);
        queue.enqueue(newMessage3);
        queue.enqueue(newMessage4);

        const queueMessages = [newMessage1, newMessage4, newMessage2, newMessage3];

        setTimeout(() => {
            let index = 0;
            expect(queue.count).toBe(4);
            while (queue.peek()) {
                const message = queue.dequeue();
                const expectedMessage = queueMessages[index];
                expect(Number(message.headers.priority)).toBe(expectedMessage.headers.priority);
                expect(Number(message.headers.time)).toBe(expectedMessage.headers.time);
                expect(message.body.Id).toBe(expectedMessage.body.Id);
                expect(message.body.data).toBe(expectedMessage.body.data);
                index = index + 1;
            }
            done();
        }, 9000);
    });
});
process.specs.set(suite, []);