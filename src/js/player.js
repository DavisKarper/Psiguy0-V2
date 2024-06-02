import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType, PointerEventReceiver, PointerAbstraction } from "excalibur"
import { Resources } from './resources'
import { GrassFloor } from "./grassFloor"
import { Helmet } from "./helmet"
import { Laser } from "./laser"
import { HelmetItem } from "./helmetItem"

export class Player extends Actor {
    laserForce
    currentLaser
    speed
    death = false

    constructor(x, y) {
        super({
            width: 50,
            height: 110,
            x: x,
            y: y
        })
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: { rows: 19, columns: 16, spriteWidth: 128, spriteHeight: 128 }
        })
        const idle = runSheet.sprites[0]
        const run = Animation.fromSpriteSheet(runSheet, range(1, 8), 50)
        const jump = Animation.fromSpriteSheet(runSheet, range(144, 150), 100)
        const fall = Animation.fromSpriteSheet(runSheet, range(150, 152), 180)
        const preparingDash = Animation.fromSpriteSheet(runSheet, range(128, 134), 100)
        const death = runSheet.sprites[9]




        this.graphics.add("idle", idle)
        this.graphics.add("run", run)
        this.graphics.add("jump", jump)
        this.graphics.add("fall", fall)
        this.graphics.add("preparingDash", preparingDash)
        this.graphics.add("death", death)

        this.graphics.use('idle')

        this.body.collisionType = CollisionType.Active;
        this.speed = 175

    }

    onInitialize(engine) {
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true

        this.vel = new Vector(0, 0)
        this.on('collisionstart', (event) => this.collisionUpdate(event, engine))

        this.laserForce = false
    }

    collisionUpdate(event, engine) {
        if (event.other instanceof Laser) {
            this.deathSequence(event, engine)
        }
        if (event.other instanceof HelmetItem) {
            event.other.kill()
            let helmet = new Helmet()
            this.addChild(helmet)
        }
    }

    deathSequence(event, engine) {
        this.speed = 0
        event.other.kill()
        this.death = true
        setTimeout(() => {
            engine.goToScene('intro')
            this.kill()
            this.death = false
        }, 1500);
    }

    laserActivation(event) {
        this.laserForce = true
        this.currentLaser = event.other
        setTimeout(() => {
            this.laserForce = false
        }, 750)
    }

    onPreUpdate(engine, delta) {

        let xspeed = 0
        let yspeed = this.vel.y
        let speedAmount = this.speed
        // this.graphics.flipHorizontal = (this.vel.x < 0)
        if (!this.death) {
            if (xspeed === 0 && yspeed === 0) {
                this.graphics.use('idle')
            }
            if (this.laserForce) {
                this.graphics.use('preparingDash')
            } else {
                if (this.vel.y < 0) {
                    this.graphics.use('jump')
                } else {
                    if (this.vel.y > 0) {
                        this.graphics.use('fall')
                    } else {
                        if (this.vel.x > 0) {
                            this.graphics.flipHorizontal = false
                            this.graphics.use('run')
                        }
                        if (this.vel.x < 0) {
                            this.graphics.flipHorizontal = true
                            this.graphics.use('run')
                        }
                    }

                }
            }
        } else (
            this.graphics.use('death')
        )

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -1 * speedAmount
        }
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 1 * speedAmount
        }
        if (this.vel.y === 0) {
            if (engine.input.keyboard.wasPressed(Keys.W) || engine.input.keyboard.wasPressed(Keys.Up) || engine.input.keyboard.wasPressed(Keys.Space)) {
                yspeed = -3 * speedAmount
            }
        } else {
            if (this.laserForce) {
                if (engine.input.keyboard.wasPressed(Keys.W) || engine.input.keyboard.wasPressed(Keys.Up) || engine.input.keyboard.wasPressed(Keys.Space)) {
                    this.currentLaser.kill()
                    yspeed = -3 * speedAmount
                    this.graphics.use('preparingDash')
                    this.laserForce = false
                }
            }
        }

        this.vel = new Vector(xspeed, yspeed)
    }
}
