import Phaser from "phaser";
import logoImg from "../../assets/img/utils/bg/Intro_Screen_background.png";

export default class MainGame extends Phaser.Scene {
    constructor() {
        super({key: 'mainGame', active: true})
    }
    preload() {
        this.load.image("logo", logoImg);
    }
    create() {
        const logo = this.add.image(400, 150, "logo");
      
        this.tweens.add({
          targets: logo,
          y: 450,
          duration: 2000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });
    }
}
