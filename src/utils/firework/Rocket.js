import {Trail} from "./Trail"
import { Vector2 } from "./Vector2";

export class Rocket extends Trail {
    constructor(childFactory, explosionFactory, position, velocity = new Vector2) {
        super(childFactory, position, velocity);

        this.explosionFactory = explosionFactory;
        this.lifetime = 10;
    }

    update(time) {
        if (this.getRemainingLifetime() && this.velocity.y > 0) {
            this.explosionFactory(this);
            this.lifetime = 0;
        }

        super.update(time);
    }
}
