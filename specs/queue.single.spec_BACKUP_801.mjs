<<<<<<< HEAD
import { MessageFactory, MessagePriority, Queue } from '../registry.mjs';
=======
import { MessageFactory, MessagePriority } from '../registry.mjs';
>>>>>>> 7bdb457d9307bcc1e7bbcd4fb137eab32e54c315
describe('when ', () => {
    it('should ', (done) => {
        const queue = process.queue;
        const newMessage = MessageFactory.create('Hello World', MessagePriority.High);
        queue.enqueue(newMessage);
        setTimeout(() => {
            const message = queue.dequeue();
            expect(message.headers.priority).toBeInstanceOf(Number);
            expect(message.headers.time).toBeInstanceOf(Number);
            expect(message.headers.priority).toBe(newMessage.headers.priority);
            expect(message.headers.time).toBeGreaterThan(newMessage.headers.time);
            expect(message.body.Id).toBe(newMessage.body.Id);
            expect(message.body.data).toBe(newMessage.body.data);
            done();
        }, 1000);
    });
});