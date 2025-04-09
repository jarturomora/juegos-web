import EscenaBase from './escenaBase.js';

// Configuración general del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [EscenaBase]
};

// Crear el juego con la configuración
const game = new Phaser.Game(config);
