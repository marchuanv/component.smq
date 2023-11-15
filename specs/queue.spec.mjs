import { Connection, ConnectionOptions, MessageFactory, Queue } from '../lib/registry.mjs';
const suite = fdescribe('when ', () => {
    it('should ', async () => {
        const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
        const connection = new Connection(connectionOptions);
        const queue = new Queue(connection);
        const message = MessageFactory.create('Hello World');
        const responseMessage = await queue.enqueue(message);
        expect(JSON.stringify(responseMessage)).toBe(JSON.stringify({ Id: message.body.Id, data: 'message received and is valid' }));
    });
});
process.specs.set(suite, []);