import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, positionY, positionX, fixture, config) {
        super(scene, positionY, positionX, fixture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.config = config
        this.scale = 0.3


    }
    update() {

    }
    shoot(pointer) {
        var bullet = this.bullets.get(pointer.x, pointer.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = 200;
        }
    }

}