let pasos = 0;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let player;
let cursors;
let teclasWASD;
let textoPasos;
let sonidoInicio;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/sonic.png');
    this.load.audio('start', 'https://labs.phaser.io/assets/audio/SoundEffects/key.wav');
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player');
    player.setScale(1.5);

    // Teclas de flechas
    cursors = this.input.keyboard.createCursorKeys();

    // Teclas WASD personalizadas
    teclasWASD = this.input.keyboard.addKeys({
        arriba: Phaser.Input.Keyboard.KeyCodes.W,
        abajo: Phaser.Input.Keyboard.KeyCodes.S,
        izquierda: Phaser.Input.Keyboard.KeyCodes.A,
        derecha: Phaser.Input.Keyboard.KeyCodes.D
    });

    textoPasos = this.add.text(20, 20, 'Pasos: 0', {
        font: '20px Arial',
        fill: '#ffffff'
    });

    sonidoInicio = this.sound.add('start');
    sonidoInicio.play();
}

function update() {
    let movimiento = false;

    // Movimiento a la izquierda
    if (cursors.left.isDown || teclasWASD.izquierda.isDown) {
        player.x -= 2;
        movimiento = true;
    }

    // Movimiento a la derecha
    if (cursors.right.isDown || teclasWASD.derecha.isDown) {
        player.x += 2;
        movimiento = true;
    }

    // Movimiento hacia arriba
    if (cursors.up.isDown || teclasWASD.arriba.isDown) {
        player.y -= 2;
        movimiento = true;
    }

    // Movimiento hacia abajo
    if (cursors.down.isDown || teclasWASD.abajo.isDown) {
        player.y += 2;
        movimiento = true;
    }

    // Contar solo pasos laterales (izquierda o derecha)
    if (movimiento) {
        pasos++;
        textoPasos.setText('Pasos: ' + pasos);
    }
}
