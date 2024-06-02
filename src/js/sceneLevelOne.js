import { Actor, Engine, Vector, Scene, DisplayMode, SolverStrategy, Label } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { MetalWall } from './metalWall.js';
import { Player } from './player.js';
import { GrassFloor } from './grassFloor.js';
import { MetalBeam } from './metalBeam.js';
import { LaserCannon } from './laserCannon.js';
import { FinishLine } from './finishLine.js';
import { HelmetItem } from './helmetItem.js';
import { EndScreen } from "./sceneEnd.js";

export class LevelOne extends Scene {
    cannons = []
    currentScore

    onInitialize(engine) {
        const background = new Actor()
        this.add(background)
        background.graphics.use(Resources.Level1BG.toSprite())
        background.pos = new Vector(800, 450)
        this.spawnTerrain()
    }

    onActivate(ctx) {
        for (let i = 0; i < this.cannons.length; i++) {
            this.cannons[i].kill()
        }
        this.cannons = []
        this.spawnCannon(1500, 750, -350, 0, 4000, true) //cannon2
        this.spawnCannon(200, 500, 350, 0, 4000, false) //cannon1
        this.spawnHelmet(700, 690)
        setTimeout(() => {
            this.spawnPlayer(75, 750)
        }, 250);
    }

    spawnTerrain() {
        for (let i = 0; i < 5; i++) {
            this.spawnFloor(100 + 360 * i, 850)
        }
        this.spawnPlatform(600, 690)

        this.spawnPlatform(0, 500)
        //cannon1
        this.spawnPlatform(1825, 500)

        this.spawnPlatform(1000, 390)
        this.spawnPlatform(1650, 390)

        this.spawnPlatform(1700, 750)
        //cannon2
        this.spawnPlatform(-300, 750)

        this.spawnWall(-20, 450, 0.2, 5)
        this.spawnWall(1620, 450, 0.2, 5)

        this.spawnFinishLine(1620, 300, 'end')
    }

    spawnPlayer(x, y) {
        const player = new Player(x, y)
        this.add(player)
    }

    spawnFloor(x, y) {
        const floor = new GrassFloor(x, y)
        this.add(floor)
    }
    spawnPlatform(x, y) {
        const platform = new MetalBeam(x, y)
        this.add(platform)
    }
    spawnCannon(x, y, xSpeed, ySpeed, interval, flip) {
        const cannon = new LaserCannon(x, y, xSpeed, ySpeed, interval, flip)
        this.add(cannon)
        this.cannons.push(cannon)
    }
    spawnWall(x, y, scaleX, scaleY) {
        const wall = new MetalWall(x, y, scaleX, scaleY)
        this.add(wall)
    }
    spawnFinishLine(x, y, nextLevel) {
        const finish = new FinishLine(x, y, nextLevel)
        this.add(finish)
    }
    spawnHelmet(x, y) {
        const helmet = new HelmetItem(x, y)
        this.add(helmet)
    }
}
