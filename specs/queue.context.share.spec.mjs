import { Connection, HttpConnection, MessageFactory, MessagePriority, Queue } from '../registry.mjs';
describe('when creating queues given shared connection', () => {
    it('should be in sync', (done) => {

        const httpConnection = new HttpConnection(process.connectionOptions);
        const connection = new Connection(httpConnection);

        const queue1 = new Queue(connection);
        const queue2 = new Queue(connection);

        const newMessage1 = MessageFactory.create('Hello World 1', MessagePriority.High);
        const newMessage2 = MessageFactory.create('Hello World 2', MessagePriority.Medium);
        const newMessage3 = MessageFactory.create('Hello World 3', MessagePriority.Low);
        const newMessage4 = MessageFactory.create('Hello World 4', MessagePriority.High);

        queue1.enqueue(newMessage1);
        queue2.enqueue(newMessage2);
        queue1.enqueue(newMessage3);
        queue2.enqueue(newMessage4);

        setTimeout(() => {

            expect(queue1.count).toBeDefined();
            expect(queue2.count).toBeDefined();

            expect(queue1.count).not.toBeNull();
            expect(queue2.count).not.toBeNull();

            expect(queue1.count).toBe(queue2.count);

            const queue1Peek = queue1.peek();
            const queue2Peek = queue2.peek();

            expect(queue1Peek).toBeDefined();
            expect(queue2Peek).toBeDefined();

            expect(queue1Peek).not.toBeNull();
            expect(queue2Peek).not.toBeNull();

            expect(queue1Peek).toBe(queue2Peek);
            done();
        }, 1000);
    });
});