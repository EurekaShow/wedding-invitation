import { Particle } from "./Particle";
import { TrailEx } from "./TrailEx";
import { Vector2 } from "./Vector2"

let imgCache = {};

function addImage(idx) {

    if (imgCache[idx]) return imgCache[idx];
    const img = new Image();
    img.src = require("/static/spark/" + idx + ".png");
    imgCache[idx] = img;
    return img;
}

export default function childFactory() {
    function getColor(idx) {
        switch (idx) {
            case 1: return "#f84";
            case 2: return "#84f";
            case 3: return "#8ff";
            case 4: return "#fff";
            case 5: return "#4f8";
            case 6: return "#f44";
            case 7: return "#f84";
            case 8: return "#84f";
            case 9: return "#fff";
            case 10: return "#44f";
        }
    }

    function getChildFactory(idx) {
        return function (parent) {
            const direction = Math.random() * Math.PI * 2;
            const force = 8;
            const velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
            const color = getColor(idx);
            const radius = 0.5 + Math.random();
            const lifetime = 0.5;
            const mass = .1;
            return new Particle(parent.position.clone(), velocity, color, radius, lifetime, mass);
        };
    }

    function getTrail(position, idx) {
        const direction = Math.random() * Math.PI * 2;
        const force = Math.random() * 128;
        const velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
        const lifetime = 0.8 + Math.random() * 1.2;
        const mass = .09;
        position = position.add(velocity.clone().multiplyScalar(0.25));
        return new TrailEx(getChildFactory(idx), position, velocity, lifetime, mass, addImage(idx));
    }

    return function (parent) {
        let trails = 30 + Math.floor(Math.random() * 30);
        let arr = [];
        let count = Math.ceil(Math.random()*6) + 1;
        while(count--){
            arr.push(Math.ceil(Math.random() * 10));
        }

        while (trails--) {
            let index = Math.floor(Math.random() * arr.length);
            let idx = arr[index];
            if (idx == 2 || idx == 6) {
                arr.splice(index, 1);
                if(arr.length<1){
                    arr.push(Math.ceil(Math.random() * 10))
                }
            }
            parent.children.push(getTrail(parent.position.clone(), idx));
        }
    };
}