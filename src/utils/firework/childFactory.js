import {Trail} from "./Trail"
import {Particle} from "./Particle"
import {Vector2} from "./Vector2"

export default function childFactory(baseHue) {
    function getColor() {
        const hue = Math.floor(baseHue + Math.random() * 15) % 360;
        const lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
        return `hsl(${hue}, 100%, ${lightness}%`;
    }

    function getChildFactory() {
        return function (parent) {
            const direction = Math.random() * Math.PI * 2;
            const force = 8;
            const velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
            const color = getColor();
            const radius = 1 + Math.random();
            const lifetime = 1;
            const mass = .1;

            return new Particle(parent.position.clone(), velocity, color, radius, lifetime, mass);
        };
    }

    function getTrail(position) {
        const direction = Math.random() * Math.PI * 2;
        const force = Math.random() * 128;
        const velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
        const lifetime = .5 + Math.random();
        const mass = .075;

        return new Trail(getChildFactory(), position, velocity, lifetime, mass);
    }

    return function (parent) {
        let trails = 32;
        while (trails--) {
            parent.children.push(getTrail(parent.position.clone()));
        }
    };
}