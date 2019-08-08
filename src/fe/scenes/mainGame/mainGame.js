import Phaser from 'phaser';
import Hero from 'Characters/hero';
import Enemy from 'Characters/enemy';
import heroIMG from 'Assets/img/characters/heros/Jet-top.svg';
import heroBullet from 'Assets/img/bullets/bullet.png'
import eyeUfo from 'Assets/img/characters/baddies/bug1.svg'

const spawnOrder = '111111111111#'+
                   '100011110001#'+
                   '100011110001#'+
                   '111111111111#';

export default class MainGame extends Phaser.Scene {
    constructor() {
        super({key: 'mainGame', active: true})
    }
    preload() {
        this.load.image('hero', heroIMG);
        this.load.image('heroDefaultBullet', heroBullet)
        this.load.image('eyeUfo', eyeUfo)
    }
    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        let keys = {
            up: this.input.keyboard.addKey('W'),
            left: this.input.keyboard.addKey('A'),
            down: this.input.keyboard.addKey('S'),
            right: this.input.keyboard.addKey('D'),
            fire: this.input.keyboard.addKey('T'),
        }

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

        this.physics.world.on('worldbounds', () => this.enemyHitWorldBounds());
    }
    update () {
        this.heroGroup.getChildren()[0].update();
        this.enemyGroup.getChildren().forEach(element => {
            element.update();
        });
    }
    enemyHitWorldBounds () {
        this.enemyGroup.getChildren().forEach(element => {
            element.goDownToggleDirection();
        });
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
