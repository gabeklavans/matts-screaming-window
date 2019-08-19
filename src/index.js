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

// All possible input types
var weakUpLeft;
var strongUpLeft;
var weakDownLeft;
var strongDownLeft;

var strongUpPressed = false;
var strongDownPressed = false;

// How many inputs are being pressed simultaneously
var inputCount = 0;
var strongCount = 0;

// Possible states of motion
var goingUp = false;
var goingDown =  false;
var isLocked = false;
var isStrong = false;

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

    // Add the hotkey objects
    weakUpLeft = game.input.keyboard.addKey(Phaser.Keyboard.E);
    weakUpLeft.onDown.add(() => {goingUp = true; inputCount ++}, this);
    weakUpLeft.onUp.add(() => {goingUp = false; inputCount --;}, this);

    strongUpLeft = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    strongUpLeft.onDown.add(() => {goingUp = true; inputCount ++}, this);
    strongUpLeft.onUp.add(() => {strongCount ++}, this);

    weakDownLeft = game.input.keyboard.addKey(Phaser.Keyboard.D);
    weakDownLeft.onDown.add(() => {goingDown = true; inputCount ++}, this);
    weakDownLeft.onUp.add(() => {goingDown = false; inputCount --}, this);

    strongDownLeft = game.input.keyboard.addKey(Phaser.Keyboard.C);
    strongDownLeft.onDown.add(() => {goingDown = true; inputCount ++}, this);
    strongDownLeft.onUp.add(() => {strongCount ++}, this);

    game.add.text(5, game.height - 20, 'Made using boilerplate by oliverbenns https://github.com/oliverbenns/phaser-starter', { font: "bold 14px Arial", fill: "#fff" });
    window = game.add.sprite(game.world.centerX, game.world.centerY * 1.2, 'window')
    this.count = game.add.text(5,5, 'Inputs: ' + inputCount, { font: "bold 14px Arial", fill: "#fff" });
}

function update() {
    this.count.text = 'Inputs: ' + inputCount;

    // Will always lock if more than one input is pressed at once
    if (inputCount > 1) {
        isLocked = true;
    }

    if (isLocked) {
        if (strongCount) {
            goingDown = false;
            goingUp = false;
            strongCount --;
            inputCount --;
        }
    } else {
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            window.y -= 8;
        }
        else if (goingUp) {
            window.y -= 4;
        }

        if (goingDown) {
            window.y += 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            window.y += 8; 
        }
    }

    // Will always be unlocked if there are no keys being pressed
    if (inputCount == 0) {
        isLocked = false;
    }

}
