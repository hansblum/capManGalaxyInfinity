import Phaser from "phaser";

import MainGame from "./scenes/mainGame/mainGame"

const config = {
  type: Phaser.AUTO,
  parent: "capman-galaxy-infinity",
  width: 800,
  height: 600,
  scene: [MainGame]
};

const game = new Phaser.Game(config);

