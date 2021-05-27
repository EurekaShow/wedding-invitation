export default class Moon {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.resize(width, height);
    }

    resize(width, height) {
        this.width = width
        this.height = height

        let min = Math.min(this.width, this.height);

        if(min>600)min = 600;
        if(min<300)min = 300;

        let x0 = Math.floor(min / 5);
        let x1 = Math.floor(min / 7);

        this.x = x0;

        this.r1 = Math.floor(0.9 * x1);
        this.r2 = x1;
    }

    draw() {
        let x = this.x, y = this.x;
        let ctx = this.ctx,
            gradient = ctx.createRadialGradient(
                x, y, this.r1, x, y, this.r2);
        //径向渐变
        gradient.addColorStop(0, 'rgb(255,255,255)');
        gradient.addColorStop(1, 'rgb(255,255,255,0)');
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.r2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}