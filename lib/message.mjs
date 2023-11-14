import { randomUUID } from './registry.mjs';
export class Message {
    constructor() {
        this._Id = randomUUID();
    }
}