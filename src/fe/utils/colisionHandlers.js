import Enemy from 'Characters/enemy';

export default class CollisionHandlers {
    constructor(scene) {
        this.scene = scene;
        scene.physics.add.overlap(scene.enemyGroup, scene.hiddenWall, this.gameOver, null, this);
        scene.physics.add.overlap(scene.enemyBullets, scene.heroGroup, this.enemyBulletHitPlayer, null, this);
        scene.physics.add.overlap(scene.heroGroup.getChildren()[0].bullets, scene.enemyGroup, this.bulletHitEnemy, null, this);

        scene.physics.world.on('worldbounds', (element) => {
            if(element.gameObject instanceof Enemy && element.gameObject.active){
                this.enemyHitWorldBounds()
            }
        });
    }
    gameOver () {
        this.scene.scene.start('enterName', {});
    }
    bulletHitEnemy(bullet, enemy){
        if(bullet.active && enemy.active){
            this.scene.gamerData.score = this.scene.gamerData.score + 10;
            this.scene.doExplosion(enemy);
            this.scene.enemyGroup.killAndHide(enemy);
            this.scene.heroGroup.getChildren()[0].bullets.killAndHide(bullet)
        }
    }
    enemyBulletHitPlayer(bullet, player) {
        if(bullet.active && player.active){
            if(this.scene.gamerData.lives > 0) {
                this.scene.gamerData.lives = this.scene.gamerData.lives - 1;
                this.scene.enemyBullets.killAndHide(bullet);
                this.scene.doExplosion(player);
            } else{
                this.gameOver();
            }
        }
    }
    enemyHitWorldBounds () {
        this.scene.enemyGroup.getChildren().forEach(element => {
            element.goDownToggleDirection();
        });
    }
}