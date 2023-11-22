import { MessageFactory, MessagePriority } from '../registry.mjs';
describe('when ', () => {
    it('should ', (done) => {
        const queue = process.queue;
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