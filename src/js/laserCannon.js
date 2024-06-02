import { Actor, Vector, Timer } from "excalibur";
import { Resources } from "./resources.js";
import { Laser } from "./laser.js";


export class LaserCannon extends Actor {
    xSpeed
    ySpeed
    interval
    constructor(x, y, bulletXspeed, bulletYspeed, interval, flip) {
        super({ width: Resources.LaserCannon.width, height: Resources.LaserCannon.height });
        this.pos = new Vector(x, y)
        this.xSpeed = bulletXspeed
        this.ySpeed = bulletYspeed
        this.interval = interval
        this.graphics.flipHorizontal = flip
    }

    onInitialize(engine) {
        this.graphics.use(Resources.LaserCannon.toSprite())
        this.scale = new Vector(0.6, 0.6);
        setTimeout(() => {
            this.spawnBullet()
        }, this.interval)
    }

    spawnNextBullet() {
        setTimeout(() => {
            this.spawnBullet()
        }, this.interval)
    }

    spawnBullet() {
        let bullet = new Laser(this.xSpeed, this.ySpeed)
        this.addChild(bullet)
        this.spawnNextBullet()
    }
}