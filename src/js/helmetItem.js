import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class HelmetItem extends Actor {

    constructor(x, y) {
        super({ width: 128, height: 128, x: x, y: y });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.MagnetItem.toSprite())
        this.scale = new Vector(2, 2);

    }
}