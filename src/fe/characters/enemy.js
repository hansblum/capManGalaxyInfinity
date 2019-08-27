import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, positionY, positionX, fixture, config) {
        super(scene, positionY, positionX, fixture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.config = config
        this.scale = 0.2
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.velocity.x = -this.config.speed;
        this.goLeft = true;
    }
    update() {
        

    }
    shoot(bullet) {
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 200;
        }
    }
    goDownToggleDirection(){
        //debugger;
        this.y = this.y + this.config.decentSpeed;
        if(!this.goLeft) {
            this.body.velocity.x = this.config.speed;
        } else {
            this.body.velocity.x = -this.config.speed;
        }
        this.goLeft = !this.goLeft;
    }

}