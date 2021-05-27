function mountainHeight(position, roughness) {
    let frequencies = [1721, 947, 547, 233, 73, 31, 7];

    return frequencies.reduce((height, freq) => height * roughness - Math.cos(freq * position), 0);
}

export default class Mountain {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.resize(width, height)
    }

    resize(width, height) {
        this.width = width
        this.height = height
    }

    draw() {
        let ctx = this.ctx;
        ctx.save();
        let width = this.width;
        let base_height = 4 * this.height / 5;
        ctx.fillStyle = `hsl(7, 10%, 8%)`;
        for (let x = width; x--;) {
            let position = x / 2000;
            let roughness = .45;
            let y = mountainHeight(position, roughness) * 60 + base_height;
            ctx.fillRect(x, y, 1, 999);
        }
        ctx.restore();
    }
}