import 'pixi';
import 'p2';
import 'phaser';

import pkg from '../package.json';

// This is the entry point of your game.

const config = {
  width: 800,
  height: 600,
  renderer: Phaser.AUTO,
  parent: '',
  state: {
    preload,
    create,
    update
  },
  transparent: false,
  antialias: true,
  physicsConfig: { arcade: true },
};

const game = new Phaser.Game(config);

var window;

function preload() {
  this.game.load.image('study', 'assets/img/study.png');
  this.game.load.image('window', 'assets/img/carwindow.jpg');
}

function create() {
  const { game } = this;
  const objects = [
    game.add.text(game.world.centerX, game.world.centerY * 0.8, `Welcome to Ur Mom ${pkg.dependencies.phaser.substr(1)}`, { font: "bold 19px Arial", fill: "#fff" }),
  ];

  objects.forEach(obj => obj.anchor.setTo(0.5, 0.5));

  game.add.text(5, game.height - 20, 'Made using boilerplate by oliverbenns https://github.com/oliverbenns/phaser-starter', { font: "bold 14px Arial", fill: "#fff" });
  window = game.add.sprite(game.world.centerX, game.world.centerY * 1.2, 'window')
}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
    {
        window.y -= 8;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        window.y -= 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        window.y += 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.X))
    {
        window.y += 8;
    }

}
