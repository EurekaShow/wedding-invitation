import getTrustParticleFactory from "./explosionFactory"
import getExplosionFactory1 from "./childFactoryEx";
import { Rocket } from "./Rocket";
import { Vector2 } from "./Vector2";
import { Time } from "./Time";
import { createCanvas } from "../createCanvas";

export function excuteFireworks() {
    const dom = document.body;
    let width = dom.offsetWidth;
    let height = dom.offsetHeight;
    const canvas = createCanvas(dom);
    const context = canvas.getContext('2d');

    let time = new Time();
    let delta = 1 + Math.random() * 3;

    let rockets = [];


    const addRocket = function () {

        if (time.elapsed < delta) return;

        delta = 1 + Math.random() * 3;
        time.start = time.previous;

        const trustParticleFactory = getTrustParticleFactory();
        const explosionFactory = getExplosionFactory1(Math.random() * 360);

        const position = new Vector2(Math.random() * width, height);
        const thrust = height * .75;
        const angle = Math.PI / -2 + (Math.random() - .5) * Math.PI / 8;
        const velocity = new Vector2(Math.cos(angle) * thrust, Math.sin(angle) * thrust);
        const lifetime = 3;

        rockets.push(new Rocket(trustParticleFactory, explosionFactory, position, velocity, lifetime));

        rockets = rockets.filter(function (rocket) {
            return rocket.isAlive;
        });
    };

    window.addEventListener("resize", function () {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        
        draw();
    })

    const draw = ()=> {
        context.clearRect(0, 0, width, height);
        
        time.update();
        addRocket();

        rockets.forEach(function (rocket) {
            rocket.update(time);
            rocket.render(canvas, context);
        });
    }

    const render = function () {
        requestAnimationFrame(render);

        draw();
    };

    render();
}