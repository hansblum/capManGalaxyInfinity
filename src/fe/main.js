import Phaser from 'phaser';

import MainGame from './scenes/mainGame/mainGame';

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
  scene: [MainGame]
};

const game = new Phaser.Game(config);

