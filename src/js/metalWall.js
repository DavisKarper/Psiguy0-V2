import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";

export class MetalWall extends Actor {
    xScale
    yScale
    constructor(x, y, scaleX, scaleY) {
        super({ width: Resources.MetalWall.width + 200, height: Resources.MetalWall.height, x: x, y: y });
        this.xScale = scaleX
        this.yScale = scaleY
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.MetalWall.toSprite())
        this.scale = new Vector(this.xScale, this.yScale);
    }
}