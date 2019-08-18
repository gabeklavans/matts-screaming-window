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
var weakUp;
var strongUp;
var weakDown;
var strongDown;

var strongUpPressed = false;
var strongDownPressed = false;

// How many inputs are being pressed simultaneously
var inputCount = 0;

// Possible states of motion
var goingUp = false;
var goingDown =  false;
var isLocked = false;

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
    weakUp = game.input.keyboard.addKey(Phaser.Keyboard.E);
    weakUp.onDown.add(() => {goingUp = true; inputCount ++}, this);
    weakUp.onUp.add(() => {
        goingUp = false; 
        inputCount --;
        if (strongUpPressed) {
            strongUpPressed = false;
            inputCount --;
        }}, this);

    strongUp = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    strongUp.onDown.add(() => {goingUp = true; strongUpPressed = true; inputCount ++}, this);

    weakDown = game.input.keyboard.addKey(Phaser.Keyboard.D);
    weakDown.onDown.add(() => {goingDown = true; inputCount ++}, this);
    weakDown.onUp.add(() => {goingDown = false; inputCount --}, this);

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
        // sad trombone sound
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
