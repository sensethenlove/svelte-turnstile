export default class SvelteTurnstileError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
