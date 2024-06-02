import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { MetalBeam } from "./metalBeam.js";


export class Laser extends Actor {

    constructor(xSpeed, ySpeed) {
        super({ width: Resources.Laser.width, height: Resources.Laser.height });
        this.vel = new Vector(xSpeed, ySpeed)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Laser.toSprite())
        this.scale = new Vector(0.7, 0.3);
        this.on('collisionstart', (event) => this.collisionUpdate(event))

    }

    collisionUpdate(event) {
        if (event.other instanceof MetalBeam) {
            this.kill()
        }
    }
}