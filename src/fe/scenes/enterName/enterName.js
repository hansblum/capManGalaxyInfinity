
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'


export default class EnterName extends Phaser.Scene {
    constructor() {
        super({key: 'enterName', active: true})
    }
    preload() {
        this.load.image('introBG', introBG);

    }
    create() {
        this.bg = this.add.image(0, 0, 'introBG');
        this.key = this.input.keyboard.addKey('W')

    }
    update () {
        if (this.key.isDown) {
            this.scene.start('mainGame', { userName: 'hackerman' });
        }

    }
}
