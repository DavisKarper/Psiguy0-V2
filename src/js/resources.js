import { ImageSource, Sound, Resource, Loader, Rectangle } from 'excalibur'
import { IntroScreen } from './sceneIntro'

const Resources = {
    PlayerSpriteSheet: new ImageSource('images/playerSpriteSheet0.png'),
    GrassFloor: new ImageSource('images/GrassFloor.png'),
    AntennaHelmet: new ImageSource('images/antenna-helmet.png'),
    MetalBeam: new ImageSource('images/metalBeam.png'),
    Laser: new ImageSource('images/laser.png'),
    LaserCannon: new ImageSource('images/laserCannon.png'),
    MagnetItem: new ImageSource('images/MagnetItem.png'),
    Laser: new ImageSource('images/laser.png'),
    MetalWall: new ImageSource('images/metalWall.png'),
    FinishLine: new ImageSource('images/FinishLine.png'),
    PsiGuy0IntroScreen: new ImageSource('images/Psiguy0IntroScreen.png'),
    PsiGuy0EndScreen: new ImageSource('images/Psiguy0EndScreen.png'),
    Level1BG: new ImageSource('images/level1BG.png'),
}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}

const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }