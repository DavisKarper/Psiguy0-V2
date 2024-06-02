import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Laser } from "./laser"
import { Player } from "./player.js"


export class Helmet extends Actor {

    constructor() {
        super({ width: 175, height: 200, x: 0, y: 0 });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.MagnetItem.toSprite())
        this.on('collisionstart', (event) => this.collisionUpdate(event))
    }

    collisionUpdate(event) {
        if (event.other instanceof Laser) {
            this.parent.laserActivation(event)
        }
    }
}