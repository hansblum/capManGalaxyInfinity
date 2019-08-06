import Phaser from 'phaser';

export default class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, positionY, positionX, fixture, keys) {
        super(scene, positionY, positionX, fixture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.lives = 3
        this.keys = keys;

    }
    update(){
        this.body.velocity.setTo(0, 0);
    
        if (this.keys.left.isDown) {
            this.body.velocity.x = -200;
        }
        else if (this.keys.right.isDown) {
            this.body.velocity.x = 200;
        }
        
    }

}