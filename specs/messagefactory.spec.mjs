import { Message, MessageFactory, Stream } from '../lib/registry.mjs';
const suite = describe('when receiving unicode characters over http given an acceptable total character length', () => {
    it('should utilize the message factory and create a message', () => {
        const unicode = string_to_char_code('Hello World');

        const stream = new Stream();
        const message = MessageFactory.create(unicode);
        expect(message).toBeDefined();
        expect(message).not.toBeNull();
        expect(message).toBeInstanceOf(Message);
        expect(message.Id).toBeDefined();
        expect(message.text).toBe('Hello World');
    });
});
process.specs.set(suite, []);
const string_to_char_code = ([...string]) => {
    const array = string.map((char) => {
        return char.charCodeAt(0);
    });
    // array of unicode
    return array;
}