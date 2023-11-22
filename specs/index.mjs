import {
    Connection,
    ConnectionOptions,
    HttpConnection,
    Queue,
    Specs
} from '../registry.mjs';
const connectionOptions = new ConnectionOptions(3, 10000, 'localhost', 8080, 'localhost', 8080);
const httpConnection = new HttpConnection(connectionOptions);
const connection = new Connection(httpConnection);
process.queue = new Queue(connection);
const specs = new Specs(10000, './');
specs.run();