import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";

export class MetalBeam extends Actor {

    constructor(x, y) {
        super({ width: Resources.MetalBeam.width, height: Resources.MetalBeam.height - 25 });
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.MetalBeam.toSprite())
        this.scale = new Vector(0.6, 0.6);
    }
}