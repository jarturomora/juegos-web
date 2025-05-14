import Jugador from './jugador.js'; // Importar la clase Jugador   

export default class EscenaBase extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaBase' });
    }

    preload() {
        // Cargar recursos para el juego
        this.load.image('tilesheet', 'assets/tiles.png'); // Carga tiles
        this.load.tilemapTiledJSON('map', 'assets/mapa.json'); // Carga mapa en formato JSON
        this.load.image('jugador', 'assets/prota.png'); // Carga el personaje
        //this.load.audio('musica', 'assets/music.mp3'); // Carga música de fondo

        // Cargar el sprite del jugador
        this.load.atlas('spr_player', 
                'assets/spr_player.png', 
                'assets/spr_player_atlas.json');
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

        // Reproducir música de fondo
        /* this.musica = this.sound.add('musica', {
        loop: true,      // Reproduce en bucle
        volume: 0.5      // Volumen (0 = silencio, 1 = máximo)
        });
        this.musica.play(); */
    }

    update() {
        this.jugador.update(); // Actualizar el jugador
    }
}
