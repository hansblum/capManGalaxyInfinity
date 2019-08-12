import Phaser from 'phaser';
import Hero from 'Characters/hero';
import Enemy from 'Characters/enemy';
import SFX from 'Fx/sfx';
import Hud from './HUD';
import heroIMG from 'Assets/img/characters/heros/Jet-top.svg';
import heroBullet from 'Assets/img/bullets/bullet.png'
import explode from 'Assets/img/bullets/explode.png'
import eyeUfo from 'Assets/img/characters/baddies/bug1.svg';


const spawnOrder = '111111111111#'+
                   '100011110001#'+
                   '100011110001#'+
                   '111111111111#';

export default class MainGame extends Phaser.Scene {
    constructor() {
        super({key: 'mainGame', active: false})
        this.sfx = new SFX(this);
        this.hud = new Hud(this);
    }
    init(data) {
        this.gamerData = data;
    }
    preload() {
        this.load.image('hero', heroIMG);
        this.load.image('heroDefaultBullet', heroBullet)
        this.load.image('eyeUfo', eyeUfo)
        this.load.spritesheet('kaboom', 
            explode,
            { frameWidth: 128, frameHeight: 128 }
        );

        this.sfx.preLoad();
        this.hud.preLoad();
    }
    create() {
        this.sfx.create();
        
        this.physics.world.setBoundsCollision(true, true, true, true);
        let keys = {
            up: this.input.keyboard.addKey('W'),
            left: this.input.keyboard.addKey('A'),
            down: this.input.keyboard.addKey('S'),
            right: this.input.keyboard.addKey('D'),
            fire: this.input.keyboard.addKey('T'),
        }

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers( 'kaboom', {
                start: 0,
                end: 15
            }),
            frameRate: 32,
            repeat: 0,
            hideOnComplete: true
        });

        this.explosions = this.add.group({
            defaultKey: 'kaboom',
            maxSize: 30
        });

        let _heros = [];
        _heros.push(new Hero(this, screen.width /2, screen.height - 100, 'hero', {
            keys: keys,
            fireSpeed: 500
        }));
        this.heroGroup = new Phaser.Physics.Arcade.Group(
            this.physics.world,
            this,
            _heros
        );
        this.enemyGroup = new Phaser.Physics.Arcade.Group(
            this.physics.world,
            this,
            this.spawnNewEnemys({
                startingPosition:{x:100, y:100},
                spacer: {x:100, y:100},
                texture:'eyeUfo',
                speed: 100,
                decentSpeed: 20
            })
        );
        this.sfx.heroSongIntro.play();

        this.physics.world.on('worldbounds', (element) => {
            if(element.gameObject instanceof Enemy && element.gameObject.active){
                this.enemyHitWorldBounds()
            }
            
        });
        this.physics.add.overlap(this.heroGroup.getChildren()[0].bullets, this.enemyGroup, this.bulletHitEnemy, null, this);
        this.gamerData.score = this.gamerData.score || 0; 
        //Creation of HUD as last because it will be over all other things
        this.hud.create(this.gamerData); 
    }
    update () {
        this.heroGroup.getChildren()[0].update();
        this.enemyGroup.getChildren().forEach(element => {
            element.update();
        });
        if(this.enemyGroup.countActive() === 0) {
            this.nextPhase()
        }
        this.hud.update(this.gamerData);
    }
    nextPhase () {
        //clean up bullets before new wave
        this.heroGroup.getChildren()[0].bullets.getChildren().forEach(bullet =>{
            this.heroGroup.getChildren()[0].bullets.killAndHide(bullet);
        })
        this.enemyGroup.clear(true, true);
        this.enemyGroup.addMultiple(this.spawnNewEnemys({
            startingPosition:{x:100, y:100},
            spacer: {x:100, y:100},
            texture:'eyeUfo',
            speed: 100,
            decentSpeed: 20
        }), true)
    }
    enemyHitWorldBounds () {
        this.enemyGroup.getChildren().forEach(element => {
            element.goDownToggleDirection();
        });
    }
    bulletHitEnemy(bullet, enemy){
        if(bullet.active && enemy.active){
            this.sfx.impact.play();
            this.gamerData.score = this.gamerData.score + 10;
            let explosion = this.explosions.get().setActive( true );
            explosion.on('animationcomplete', ()=> explosion.destroy());
            // Place the explosion on the screen, and play the animation.
            explosion.setOrigin( 0.5, 0.5 );
            explosion.x = enemy.x;
            explosion.y = enemy.y;
            explosion.play( 'explode' );
            this.enemyGroup.killAndHide(enemy);
            this.heroGroup.getChildren()[0].bullets.killAndHide(bullet)
        }
    }
    spawnNewEnemys (config) {
        let enemys = [];
        let spawnList = Array.from(spawnOrder);
        let currentPosition = {
            x: config.startingPosition.x,
            y: config.startingPosition.y
        };
        spawnList.forEach( (character) => {
            if(character === '0'){
                currentPosition.x = currentPosition.x + config.spacer.x;
            } else if (character === '#'){
                currentPosition.y = currentPosition.y + config.spacer.y;
                currentPosition.x = config.startingPosition.x;
            } else if (character === '1'){
                enemys.push(new Enemy(this, currentPosition.x, currentPosition.y, config.texture, config));
                currentPosition.x = currentPosition.x + config.spacer.x;
            }
        });
        
        return enemys;
    }
}
