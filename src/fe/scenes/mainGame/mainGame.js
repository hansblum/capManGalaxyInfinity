import Phaser from 'phaser';
import Hero from 'Characters/hero';
import heroIMG from 'Assets/img/characters/heros/Jet-top.svg';

export default class MainGame extends Phaser.Scene {
    constructor() {
        super({key: 'mainGame', active: true})
    }
    preload() {
        this.load.image('hero', heroIMG);
    }
    create() {

        let keys = {
            up: this.input.keyboard.addKey('W'),
            left: this.input.keyboard.addKey('A'),
            down: this.input.keyboard.addKey('S'),
            right: this.input.keyboard.addKey('D'),
        }

        this._heros = [];
        this._heros.push(new Hero(this, 700, 700, 'hero', keys))
      
    }
    update () {
        this._heros[0].update();
    }
}
