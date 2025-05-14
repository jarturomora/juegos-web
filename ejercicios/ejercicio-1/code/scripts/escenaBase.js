import Jugador from './jugador.js'; // Importar la clase Jugador   
import Enemigo from './enemigo.js'; // Importar la clase Enemigo

export default class EscenaBase extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaBase' });
    }

    preload() {
        // Cargar recursos para el juego
        this.load.image('tilesheet', 'assets/tiles.png'); // Carga tiles
        this.load.tilemapTiledJSON('map', 'assets/mapa.json'); // Carga mapa en formato JSON
        this.load.image('jugador', 'assets/prota.png'); // Carga el personaje
        this.load.image('enemigo', 'assets/enemigo.png'); // Carga el enemigo
    }

    create() {
        // Crear instancia del mapa
        this.mapa = this.make.tilemap({ key: 'map' });

        // Crear instancia del fichero de tiles
        this.hojaTiles = this.mapa.addTilesetImage('tiles', 'tilesheet', 64, 64, 1, 2);       

        // Crear instancia de la plataforma definida en el mapa
        this.plataformas = this.mapa.createLayer('plataformas', this.hojaTiles, 0, 0);

        // Crear instancia del jugador
        this.jugador = new Jugador(this, 300, 200); // Crear el jugador en la posición (300, 200)
        this.plataformas.setCollisionByExclusion(-1, true); // Establecer colisión con las plataformas
        this.jugador.setCollideWorldBounds(true); // Establecer colisión del jugador con los límites del mundo
        this.physics.add.collider(this.jugador, this.plataformas); // Añadir colisión entre el jugador y las plataformas

        // Crear instancia del enemigo
        this.enemigo = new Enemigo(this, 600, 100); // Crear el enemigo en la posición (600, 100)
        this.physics.add.collider(this.enemigo, this.plataformas); // Colisión con plataformas
        this.physics.add.collider(this.enemigo, this.jugador, () => {
            this.scene.restart(); // Reinicia la escena si colisionan
        });

    }

    update() {
        this.jugador.update(); // Actualizar el jugador
        this.enemigo.update(); // Actualizar el enemigo
    }
}
