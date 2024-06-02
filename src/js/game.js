import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { IntroScreen } from './sceneIntro.js';
import { LevelOne } from './sceneLevelOne.js';
import { EndScreen } from './sceneEnd.js';

export class Game extends Engine {

    constructor() {
        super({
            width: 1600,
            height: 900,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 800),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('intro', new IntroScreen)

        this.add('level1', new LevelOne)

        this.add('end', new EndScreen)

        this.goToScene('intro')
    }

}

new Game()