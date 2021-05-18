import { Trail } from "./Trail";
import { Vector2 } from "./Vector2";

export class TrailEx extends Trail {

    constructor(childFactory, position, velocity = new Vector2, lifetime = 1, mass = 1, image) {
        super(childFactory, position, velocity, lifetime, mass);

        this.image = image;
        this.size = 60 + Math.random() * 60;
    }

    render(canvas, context) {
        super.render(canvas, context);

        this.size /= 1.01;
        let size = this.size;
        let remain = this.getRemainingLifetime();
        if(remain > 0.3){
            context.globalAlpha = 0.3;
        }
        context.drawImage(this.image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    }
}