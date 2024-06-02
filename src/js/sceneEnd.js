import { Actor, Vector, Engine, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class EndScreen extends Scene {

    onInitialize(engine) {
        console.log('you beat the game!')
        const background = new Actor()
        this.add(background)
        background.graphics.use(Resources.PsiGuy0EndScreen.toSprite())
        background.pos = new Vector(800, 450)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('intro')
        }
    }
}