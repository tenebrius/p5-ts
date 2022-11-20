import { Vector } from 'p5'
import { } from 'p5/global'

const Width = 600
const density = 0.02
const friction = 0.003
let boxes = []

let entities: Entity[] = []
let gravity: Vector;

function setup() {
    createCanvas(Width, 400);
    entities.push(new Entity(createVector(50, 50), false))
    entities.push(new Entity(createVector(50, 120), true))
    gravity = createVector(0, 0.01)
    // setTimeout(()=>{
    //     entity.applyForce(createVector(1,1))
    // })
    //
    // const box1 = {
    //     x: 2,
    //     l: 100,
    //     v: 2,
    // };
    //
    // const box2 = {
    //     x: 200,
    //     l: 60,
    //     v: 0,
    // };
    //
    // const box3 = {
    //     x: 300,
    //     l: 60,
    //     v: 0,
    // };
    //
    // const box4 = {
    //     x: 390,
    //     l: 30,
    //     v: 0,
    // };
    //
    // boxes = [box1, box2, box3, box4]

}

class Entity {
    pos = createVector(0, 0);
    vel = createVector(0, 0);
    mass = 1
    rad = 25
    fixed = false


    constructor(pos: Vector, fixed: boolean) {
        this.pos = pos;
        this.fixed = fixed
    }

    applyForce(force: Vector) {
        const p = this.vel.mult(this.mass)
        const dp = force
        const newP = p.add(dp)
        this.vel = newP.div(this.mass)
    }

    tick() {
        this.pos = this.pos.add(this.vel)
    }

    draw() {
        circle(this.pos.x-this.rad, this.pos.y-this.rad, this.rad*2)
    }
}

function applyGravity(entity: Entity) {
    if (!entity.fixed) {
        entity.applyForce(gravity)
    }
}

function draw() {
    background(220);
    for (const entity of entities) {
        entity.draw()
        entity.tick()
        applyGravity(entity)

        for (const target of entities){
            if (target !== entity) {
                if (checkCollision(entity, target)) {
                }
            }
        }
    }
}

//
// const getMassaaa =sd (box)=>{
//     return (box.l ^ 3)  * density
// }
//
// const drawBox = (box) => {
//     rect(box.x, 150 - box.l, box.l, box.l);
//     //text(box.v, box.x, 30);
// };
//

const checkCollision = (entity1: Entity, entity2: Entity) => {
    const mag = Vector.sub(entity1.pos, entity2.pos).mag()
    text(mag, 12, 10)
    text(entity1.rad + entity2.rad, 12, 50)

    // console.log(entity1.rad + entity2.rad)
    if (mag < (entity1.rad + entity2.rad)) {
        text('collisiton', 100, 100)
        return true
    }
};
// const checkWallCollision = (box)=>{
//     if (box.x + box.l > Width || box.x<  0){
//         box.v = box.v * -1
//     }
// }
//
//
// function draw() {
//     background(220);
//
//     line(0,151, Width, 151)
//     for (const box of boxes){
//         drawBox(box);
//
//
//         box.x = box.x + box.v;
//         for (const target of boxes){
//             if (box != target && checkCollision(box, target)) {
//                 console.log("collided");
//                 const m1 = getMass(box);
//                 const m2 = getMass(target);
//                 const u1 = box.v;
//                 const u2 = target.v;
//                 const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
//                 const v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
//                 box.v = v1;
//                 target.v = v2;
//             }
//         }
//         checkWallCollision(box)
//         box.v = box.v + ((box.v > 0? -1:1)  * friction)
//     }
//
// }
