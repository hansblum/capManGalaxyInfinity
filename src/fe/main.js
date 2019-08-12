import Phaser from 'phaser';

import MainGame from './scenes/mainGame/mainGame';
import EnterName from './scenes/enterName/enterName';

const config = {
  type: Phaser.AUTO,
  parent: 'capman-galaxy-infinity',
  width: screen.width,
  height: screen.height,
  physics:{
    default: 'arcade',
    arcade: {
      
      debug: false
    }
  },
  scene: [EnterName , MainGame]
};

const game = new Phaser.Game(config);

