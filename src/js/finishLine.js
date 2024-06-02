import { Actor, Vector, Scene } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./player.js"


export class FinishLine extends Actor {
    nextLevel
    constructor(x, y, nextLevel) {
        super({ width: Resources.FinishLine.width, height: Resources.FinishLine.height, x: x, y: y });
        this.nextLevel = nextLevel
    }

    onInitialize(engine) {
        this.graphics.use(Resources.FinishLine.toSprite())
        this.on('collisionstart', (event) => this.collisionUpdate(event, engine))
    }

    collisionUpdate(event, engine) {
        if (event.other instanceof Player) {
            console.log('you beat this level')
            setTimeout(() => {
                event.other.kill()
                engine.goToScene(this.nextLevel)
            }, 1500);
        }
    }
}