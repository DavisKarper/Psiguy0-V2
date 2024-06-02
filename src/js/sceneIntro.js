import { Actor, Engine, Scene, Keys, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class IntroScreen extends Scene {

    onInitialize(engine) {
        console.log("start de game!")
        const background = new Actor()
        this.add(background)
        background.graphics.use(Resources.PsiGuy0IntroScreen.toSprite())
        background.pos = new Vector(800, 450)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('level1')
        }
    }
}