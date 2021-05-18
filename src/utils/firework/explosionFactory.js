import {Particle} from "./Particle";

export default function explosionFactory() {
    function getColor() {
        const hue = Math.floor(Math.random() * 15 + 30);
        return `hsl(${hue}, 100%, 75%`;
    }

    return function () {
        const position = this.position.clone();
        const velocity = this.velocity.clone().multiplyScalar(-.1);
        velocity.x += (Math.random() - .5) * 8;
        const color = getColor();
        const radius = 1 + Math.random();
        const lifetime = .5 + Math.random() * .5;
        const mass = .01;

        return new Particle(position, velocity, color, radius, lifetime, mass);
    }
}