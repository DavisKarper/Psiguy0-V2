import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType } from "excalibur"
import { Resources } from './resources'

export class GrassFloor extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: Resources.GrassFloor.width,
            height: 70
        })
        this.body.collisionType = CollisionType.Fixed;

    }

    onInitialize(engine) {
        this.graphics.use(Resources.GrassFloor.toSprite())
        this.scale = new Vector(1, 1);
    }
}