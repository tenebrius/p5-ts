import {Vector} from 'p5'
import {} from 'p5/global'

let running = true
const Width = 600
const density = 0.02
const friction = 0.003
let boxes = []

let entities: Entity[] = []
let gravity: Vector;

const setRunning = (state) => {
    running = state
}

function setup() {
    createCanvas(Width, 400);
    entities.push(new Entity(createVector(100, 50), 1, false))
    entities.push(new Entity(createVector(125, 300), 2, true))
    gravity = createVector(0.00, 0.01)
    const u1 = createVector(1, 0)
    const u2 = createVector(0, 0)
    const m1 = 1
    const m2 = 1
    console.log(Vector.add(Vector.mult(u1, m1 - m2), Vector.mult(u2, 2 * m2)).div((m1 + m2)))
    console.log(Vector.add(Vector.mult(u2, m2 - m1), Vector.mult(u1, 2 * m1)).div((m1 + m2)))
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


    constructor(pos: Vector, mass: number, fixed: boolean) {
        this.pos = pos;
        this.fixed = fixed
        this.mass = mass
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
        let d = this.rad * 2;
        circle(this.pos.x, this.pos.y, d)
        circle(this.pos.x, this.pos.y, 2)
        text(this.pos.x + "," + this.pos.y, this.pos.x, this.pos.y)
    }
}

function applyGravity(entity: Entity) {
    if (!entity.fixed) {
        entity.applyForce(gravity)
    }
}

function resolveCollision(e1: Entity, e2: Entity) {
    const u1 = e1.vel;
    const u2 = e2.vel;
    const m1 = e1.mass
    const m2 = e2.mass
    const v1 = Vector.add(Vector.mult(u1, m1 - m2), Vector.mult(u2, 2 * m2)).div((m1 + m2))
    const v2 = Vector.add(Vector.mult(u2, m2 - m1), Vector.mult(u1, 2 * m1)).div((m1 + m2))
    e1.vel = v1;
    e2.vel = v2;
}

function draw() {
    if (running) {
        background(220);

        for (const entity of entities) {

            entity.draw()
            entity.tick()

            applyGravity(entity)

        }
        const entity = entities[0]
        const target = entities[1]

        const dir = Vector.sub(target.pos, entity.pos)
        const endPoint = Vector.add(entity.pos, dir)

        console.log("line", dir, entity.pos, endPoint)
        line(entity.pos.x, entity.pos.y, endPoint.x, endPoint.y)
        if (checkCollision(entity, target)) {
            // resolveCollision(entity, target)

            running = false
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
