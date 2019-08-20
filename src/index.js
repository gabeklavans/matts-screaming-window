import 'pixi';
import 'p2';
import 'phaser';

import pkg from '../package.json';

// This is the entry point of your game.

const config = {
    width: 700,
    height: 525,
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

// sprite variables
var window;
var holder;
var land;
var therm;
var merc;

// All possible input types
var weakUpLeft;
var strongUpLeft;
var weakDownLeft;
var strongDownLeft;

var weakUpRight;
var strongUpRight;
var weakDownRight;
var strongDownRight;

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
    this.game.load.image('window', 'assets/img/carwindow.png');
    this.game.load.image('holder', 'assets/img/holder.png');
    this.game.load.image('land', 'assets/img/land.png');
    this.game.load.image('therm', 'assets/img/therm.png');
    this.game.load.image('merc', 'assets/img/merc.png');
}

function create() {
    const { game } = this;
    const objects = [
        game.add.text(game.world.centerX, game.world.centerY * 0.8, `Welcome to Ur Mom ${pkg.dependencies.phaser.substr(1)}`, { font: "bold 19px Arial", fill: "#fff" }),
    ];

    objects.forEach(obj => obj.anchor.setTo(0.5, 0.5));
    game.stage.backgroundColor = "#727272";

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

    weakUpRight = game.input.keyboard.addKey(Phaser.Keyboard.U);
    weakUpRight.onDown.add(() => {goingUp = true; inputCount ++}, this);
    weakUpRight.onUp.add(() => {goingUp = false; inputCount --;}, this);

    strongUpRight = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    strongUpRight.onDown.add(() => {goingUp = true; inputCount ++}, this);
    strongUpRight.onUp.add(() => {strongCount ++}, this);

    weakDownRight = game.input.keyboard.addKey(Phaser.Keyboard.J);
    weakDownRight.onDown.add(() => {goingDown = true; inputCount ++}, this);
    weakDownRight.onUp.add(() => {goingDown = false; inputCount --}, this);

    strongDownRight = game.input.keyboard.addKey(Phaser.Keyboard.M);
    strongDownRight.onDown.add(() => {goingDown = true; inputCount ++}, this);
    strongDownRight.onUp.add(() => {strongCount ++}, this);

    // Add game objects    
    land = game.add.sprite(game.world.centerX, game.world.centerY, 'land');
    land.anchor.setTo(0.5, 0.5);
    land.scale.setTo(1.2,1.2);

    window = game.add.sprite(game.world.centerX, game.world.centerY, 'window');
    window.anchor.setTo(0.5, 0.5);
    window.scale.setTo(1.2,1.2);

    holder = game.add.sprite(game.world.centerX, game.world.centerY+1, 'holder');
    holder.anchor.setTo(0.5, 0.5);
    holder.scale.setTo(1.2,1.2);

    merc = game.add.sprite(game.world.centerX + 250, game.world.centerY - 100, 'merc');
    merc.anchor.setTo(0.5, 0.5);
    merc.scale.setTo(1.2,1.2);

    therm = game.add.sprite(game.world.centerX + 250, game.world.centerY, 'therm');
    therm.anchor.setTo(0.5, 0.5);
    therm.scale.setTo(1.2,1.2);

    game.add.text(5, game.height - 20, 'Made using boilerplate by oliverbenns https://github.com/oliverbenns/phaser-starter', { font: "bold 14px Arial", fill: "#fff" });

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
    } else if (goingUp && window.y <= game.world.centerY+1) {
        // window can't go any higher
        isLocked = true;
    } else if (goingDown && window.y + 2 >= game.world.centerY + window.height + 10) {
        // window can't go any lower
        isLocked = true;
    } else {
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            window.y -= 8;
        }
        else if (goingUp) {
            window.y -= 2;
        }

        if (goingDown) {
            window.y += 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            window.y += 8; 
        }
    }

    // Will always be unlocked if there are no keys being pressed
    if (inputCount == 0) {
        isLocked = false;
    }

    merc.y = window.y - 100

}
