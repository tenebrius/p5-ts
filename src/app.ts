import {Vector} from 'p5'
import {} from 'p5/global'

let running = true
const Width = 300
const Height = 300
const density = 0.02
const friction = 0.003
let isFiring = null
let firePos = null
let entities: Entity[] = []
let gravity: Vector;

const setRunning = (state) => {
    running = state
}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function setup() {
    createCanvas(Width, Height);
    // entities.push(new Entity(createVector(50, 100), createVector(5,5), 1, 'red'))
    // entities.push(new Entity(createVector(185.01487610988684, 21.036676830906814), createVector(6.792671907824161, -3.265687717330934), 10, 'blue'))
    // entities.push(new Entity(createVector(184.61538461538464, 39.615384615384585), createVector(-2.692307692307692, -6.538461538461538), 1, 'green'))
    // // entities.push(new Entity(createVector(120, 20), createVector(2, 0), 10, 'yellow'))
    for (let i =0; i < 40; i++){
        const color = getRandomColor()
        // entities.push(new Entity(createVector(random(0, Width), random(0, Height)), createVector(random(-4, 4), random(-4, 4)), 70,  color))
        entities.push(new Entity(createVector(random(0, Width), random(0, Height)),  createVector(random(-4, 4), random(-4, 4)), random(50,150),  color))
    }
    // gravity = createVector(0.00, 0.5)
    // const u1 = createVector(1, 0)
    // const u2 = createVector(0, 0)
    // const m1 = 1
    // const m2 = 1
    // console.log(Vector.add(Vector.mult(u1, m1 - m2), Vector.mult(u2, 2 * m2)).div((m1 + m2)))
    // console.log(Vector.add(Vector.mult(u2, m2 - m1), Vector.mult(u1, 2 * m1)).div((m1 + m2)))
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
    mass = 40
    rad = 25
    color = 'black'

    constructor(pos: Vector, vel: Vector, mass: number, color: string) {
        this.pos = pos;
        this.mass = mass
        this.vel = vel
        this.rad = TWO_PI * (mass/50)
        this.color = color
    }

    applyForce(force: Vector) {

        this.vel = this.vel.add(Vector.div(force, this.mass))
    }

    tick() {
        this.pos = this.pos.add(this.vel)
    }

    draw() {
        let d = this.rad * 2;
        stroke(this.color)
        circle(this.pos.x, this.pos.y, d)
        circle(this.pos.x, this.pos.y, 2)
        stroke('black')

        // text(this.pos.x + "," + this.pos.y, this.pos.x, this.pos.y)
        // const momentum = Vector.mult(this.vel, this.mass)
        // const endpoint = Vector.add(this.pos, momentum)
        // line(this.pos.x, this.pos.y, endpoint.x, endpoint.y)
        // text(momentum.x + "," + momentum.y, endpoint.x, endpoint.y)
    }
}

function applyFriction(entity: Entity) {
    entity.applyForce(Vector.normalize(entity.vel).mult(-1).setMag(0.01))
}
function applyGravity(entity: Entity) {
    entity.applyForce(createVector(0,10))
}
let collisionCount = 1

let oldCol = new Date().getTime()

function resolveCollision(e1: Entity, e2: Entity) {
    collisionCount = collisionCount + 1
    let newCol = new Date().getTime();
    oldCol = newCol


    let dir = Vector.sub(e2.pos, e1.pos)

    let theta1 = dir.angleBetween(e1.vel)
    let theta2 = dir.angleBetween(Vector.mult(e2.vel, -1))
    // if (theta1 > HALF_PI) theta1 = PI - theta1
    // if (theta2 > HALF_PI) theta2 = PI - theta2
    // console.log(degrees(theta1), degrees(theta2))
    // console.log(theta)
    const olde1Vel = e1.vel + "x"
    const olde2Vel = e2.vel + "x"
    let momentum1 = Vector.mult(e1.vel, e1.mass);
    let momentum2 = Vector.mult(e2.vel, e2.mass);
    const force1Mag = momentum1.mag() * cos(theta1)
    const force2Mag = momentum2.mag() * cos(theta2)

    // const force  = abs(mTot.mag() * cos(theta))
    // let force1Dir = theta1 > -HALF_PI && theta1 < HALF_PI ? 1 : -1;
    // let force2Dir = theta2 > -HALF_PI && theta2 < HALF_PI ? 1 : -1;
    // let force1Final = (force1Mag * force1Dir)
    // let force2Final = (force2Mag * force2Dir)
    // let forceFinal= force1Final + force2Final
    let forceFinal= force1Mag + force2Mag
    const force = dir.copy().setMag(forceFinal)



    // console.log("force", force)
    // const mag1 = abs(Vector.mult(momentum1, cos(theta1)).mag())
    // const mag2 = abs(Vector.mult(momentum2 , cos(theta2)).mag())
    // console.log("mag", mag)

    // dir.setMag(force.mag())
    // console.log("dir", dir, dir.mag())
    // console.log("momentum", momentum)
    // console.log(dir)
    // console.log("----------------------")
    // let totalVelBefore = e1.vel.y + e2.vel.x;
    // console.log(e1.vel.x, e2.vel.x, totalVelBefore)
    e1.applyForce(Vector.mult(force, -1))
    e2.applyForce(force)
    // let totalVelAfter = e1.vel.y + e2.vel.x;
    // console.log(e1.vel.x, e2.vel.x, totalVelAfter)
    // if (round(totalVelAfter) != round(totalVelBefore)) {
    //     const f = 1
    // }
    // const endpoint = Vector.add(e1.pos, dir)
    // stroke('red');
    // line(e1.pos.x, e1.pos.y, e1.pos.x + dir.x, e1.pos.y + dir.y)
    // text(dir.mag(), endpoint.x, endpoint.y)
    // stroke('black');


    // const endPoint = Vector.add(entity.pos, dir)
    // const u1 = e1.vel;
    // const u2 = e2.vel;
    // const m1 = e1.mass
    // const m2 = e2.mass
    // const v1 = Vector.add(Vector.mult(u1, m1 - m2), Vector.mult(u2, 2 * m2)).div((m1 + m2))
    // const v2 = Vector.add(Vector.mult(u2, m2 - m1), Vector.mult(u1, 2 * m1)).div((m1 + m2))
    // e1.vel = v1;
    // e2.vel = v2;
}

const wallCollision = (entity: Entity) => {
    let horizontal = createVector(1, 0);
    let vertical = createVector(0, 1);
    if (entity.pos.x <= entity.rad) {
        entity.vel.reflect(horizontal)
        entity.pos.x = entity.rad
    }
    if (entity.pos.x >= Width - entity.rad) {
        entity.vel.reflect(horizontal)
        entity.pos.x = Width - entity.rad
    }
    if (entity.pos.y <= entity.rad) {
        entity.vel.reflect(vertical)
        entity.pos.y = entity.rad
    }
    if (entity.pos.y >= Height - entity.rad) {
        entity.vel.reflect(vertical)
        entity.pos.y = Height - entity.rad
    }


}


function mouseClicked() {
    if (mouseX > 0 && mouseY > 0 && mouseX < Width && mouseY < Height) {
        if (isFiring) {
            isFiring.vel = Vector.sub(isFiring.pos, firePos).mult(0.05)
            isFiring = null
            firePos = null
        } else {
            let entity = new Entity(createVector(mouseX, mouseY), createVector(0, 0), 10, 'black');
            entities.push(entity)
            isFiring = entity
        }
    }
}

function mouseMoved() {
    if (isFiring) {
        firePos = createVector(mouseX, mouseY)
    }
}

let drawLoop = 0
let firstDraw = false

function draw() {

    if (running) {
        background(220);
        for (let x = 0; x < Width; x = x + 10) {
            stroke('#fefefe')
            line(x, 0, x, Height)
            stroke('black')
        }
        let totMomemtum = 0




        // console.log("line", dir, entity.pos, endPoint)
        // line(entity.pos.x, entity.pos.y, endPoint.x, endPoint.y)
        drawLoop++
        let pairs = []
        for (const entity of entities) {
            for (const target of entities) {
                if (target != entity) {
                    const checked = pairs.some(([e1, e2]) => {
                        return (e1 === target && e2 === entity) || (e2 === target && e1 === entity)
                    })


                    if (!checked) {
                        if (checkCollision(target, entity)) {
                            pairs.push([target, entity])
                            if (!firstDraw) {
                                resolveCollision(target, entity)
                            }
                            // running = false
                        }
                    } else {
                    }
                }
            }
        }
        for (const entity of entities) {

            entity.draw()
            // for (const target of entities) {
            //     const e1 = entity;
            //     const e2 = target
            //     let dir = Vector.sub(e2.pos, e1.pos)
            //     stroke(e1.color)
            //     line(e1.pos.x, e1.pos.y, e1.pos.x + dir.x, e1.pos.y + dir.y)
            // }
            if (!firstDraw) {
                entity.tick()
                // applyFriction(entity)
                // applyGravity(entity)

                wallCollision(entity)
                totMomemtum = totMomemtum + (entity.vel.mag() * entity.mass)
            }
        }

        if (isFiring && firePos) {
            line(firePos.x, firePos.y, isFiring.pos.x, isFiring.pos.y)
        }
        // text(round(totMomemtum.x), 10, 10)
        // text(round(totMomemtum.y), 10, 50)
        text(round(totMomemtum), 10, 70)
    }

    firstDraw = false
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

const checkCollision = (e1: Entity, e2: Entity) => {
    const mag = Vector.sub(e1.pos, e2.pos).mag()
    // text(mag, 12, 10)
    // text(entity1.rad + entity2.rad, 12, 50)

    // console.log(entity1.rad + entity2.rad)
    if (mag <= (e1.rad + e2.rad)) {
        // text('collisiton', 100, 100)
        let dir = Vector.sub(e1.pos, e2.pos)
        const dist = dir.copy()
        const curDist = dist.mag()
        const correctDist = e1.rad + e2.rad
        if (curDist < correctDist) {
            const errorDist = curDist - correctDist
            // console.log("errorDist", errorDist)
            e2.pos.add(dist.copy().setMag(errorDist / 2))
            e1.pos.sub(dist.copy().setMag(errorDist / 2))
        }

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
