
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'

const spawnOrder = '111111111111#'+
                   '100011110001#'+
                   '100011110001#'+
                   '111111111111#';

const spawnOrderTwo = '11110000000011110100001#'+
                      '10001000001010000110001#'+
                      '11110100010011110101001#'+
                      '00010010100010000100101#'+
                      '11110001000011110100011#';

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
            this.scene.start('mainGame', {
                gamerData: {
                    username: 'hackerman'
                },
                gameConfig: {
                    waves: [
                        {
                            texture:'eyeUfo',
                            startingPosition:{x:100, y:100},
                            spacer: {x:100, y:100},
                            killScore: 10,
                            shootSpeed: 300,
                            spawnOrder: spawnOrder,
                            speed: 100,
                            decentSpeed: 20
                        },
                        {
                            texture:'flagEars',
                            startingPosition:{x:100, y:100},
                            spacer: {x:50, y:100},
                            killScore: 11,
                            shootSpeed: 300,
                            spawnOrder: spawnOrderTwo,
                            speed: 100,
                            decentSpeed: 20
                        }
                    ]
                }
            });
        }

    }
}
