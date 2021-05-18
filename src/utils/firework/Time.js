export class Time {
    constructor() {
        const now = (performance || Date).now();

        this.delta = 0;
        this.elapsed = 0;
        this.start = now;
        this.previous = now;
    }

    update() {
        const now = Time.now();

        this.delta = now - this.previous;
        this.elapsed = now - this.start;
        this.previous = now;
    }

    static now() {
        return (performance || Date).now() / 1000;
    }
}
