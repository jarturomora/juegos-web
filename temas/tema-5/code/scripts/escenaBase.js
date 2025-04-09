import Personaje1 from './personaje1.js';
import Personaje2 from './personaje2.js';

export default class EscenaBase extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaBase' });
    }

    preload() {
        // Cargar recursos para ambos personajes
        this.load.image('personaje1', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
        this.load.image('personaje2', 'https://labs.phaser.io/assets/sprites/sonic.png');
    }

    create() {
        // Crear instancias de los personajes
        this.jugador = new Personaje1(this, 100, 300);
        this.enemigo = new Personaje2(this, 400, 300);

        // Detectar colisión entre los dos personajes
        this.physics.add.collider(this.jugador.sprite, this.enemigo.sprite, () => {
            // Reiniciar la escena cuando chocan
            this.scene.restart();
        });
    }

    update() {
        // Llamar a los métodos update de los personajes
        this.jugador.update();
        this.enemigo.update();
    }
}
