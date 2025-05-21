// Importar la clase del jugador desde el archivo externo
import Jugador from './jugador.js';

export default class EscenaBase extends Phaser.Scene {
  constructor() {
    super({ key: 'EscenaBase' });
  }

  preload() {
    // Cargar los recursos del juego
    this.load.image('tilesheet', 'assets/tiles.png'); // Tiles del mapa
    this.load.tilemapTiledJSON('map', 'assets/mapa.json'); // Mapa en formato JSON
    this.load.image('jugador', 'assets/prota.png'); // Imagen del jugador
    this.load.image('gema', 'assets/gema.png'); // Imagen de las gemas
    this.load.audio('musica', 'assets/music.mp3'); // Música de fondo
    this.load.audio('salto', 'assets/jump.mp3'); // Sonido de salto
    this.load.audio('recolectar', 'assets/pickup.mp3'); // Sonido al recolectar gema

    // Cargar atlas para el jugador (nueva línea añadida)
    this.load.atlas('spr_player', 'assets/spr_player.png', 'assets/spr_player_atlas.json');
  }

  create() {
    // Crear el mapa y su capa de plataformas
    const mapa = this.make.tilemap({ key: 'map' });
    const tiles = mapa.addTilesetImage('tiles', 'tilesheet', 64, 64, 1, 2);
    const plataformas = mapa.createLayer('plataformas', tiles, 0, 0);
    plataformas.setCollisionByExclusion(-1, true);

    // Reproducir música de fondo
    this.musica = this.sound.add('musica', { loop: true, volume: 0.5 });
    this.musica.play(); // Se reiniciará cada vez que la escena se reinicie

    // Cargar sonidos
    this.sonidoSalto = this.sound.add('salto');
    this.sonidoRecolectar = this.sound.add('recolectar');

    // Crear el jugador con referencia al sonido de salto
    this.jugador = new Jugador(this, 300, 200, this.sonidoSalto);
    this.jugador.setCollideWorldBounds(true);
    this.physics.add.collider(this.jugador, plataformas);

    // Crear grupo de gemas
    this.gemas = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(100, 1100);
      const y = Phaser.Math.Between(100, 400);
      const gema = this.gemas.create(x, y, 'gema');
      gema.setBounce(0.5);
      gema.setCollideWorldBounds(true);
    }

    this.physics.add.collider(this.gemas, plataformas);
    this.physics.add.overlap(this.jugador, this.gemas, this.recolectarGema, null, this);

    // Reiniciar puntos y tiempo cada vez que inicia la escena
    this.puntos = 0;
    this.tiempo = 30; // Tiempo total en segundos

    // Mostrar texto en pantalla
    this.txtPuntos = this.add.text(20, 20, 'Puntos: 0', { fontSize: '20px', fill: '#fff' });
    this.txtTiempo = this.add.text(20, 50, 'Tiempo: 30', { fontSize: '20px', fill: '#fff' });

    // Crear temporizador que actualiza el tiempo cada segundo
    this.temporizador = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.tiempo--;
        this.txtTiempo.setText('Tiempo: ' + this.tiempo);
        if (this.tiempo <= 0) this.finDelJuego();
      },
      callbackScope: this,
      loop: true
    });

    // Crear botón para reiniciar el juego (oculto al inicio)
    this.botonReiniciar = this.add.text(500, 300, 'Reiniciar (ENTER)', {
      fontSize: '30px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setInteractive().setVisible(false);

    // Reiniciar al hacer clic
    this.botonReiniciar.on('pointerdown', () => this.scene.restart());

    // Reiniciar al presionar ENTER
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if (this.tiempo > 0) {
      this.jugador.update(); // Actualizar el jugador solo si queda tiempo
    } else if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.restart(); // Reiniciar al presionar ENTER
    }
  }

  // Funciones auxiliares

  // Función para recolectar gemas
  recolectarGema(jugador, gema) {
    gema.disableBody(true, true); // Desactivar gema recolectada
    this.sonidoRecolectar.play(); // Reproducir sonido
    this.puntos += 3; // Sumar puntos
    this.txtPuntos.setText('Puntos: ' + this.puntos); // Actualizar marcador
  }

  // Función para reiniciar el juego
  finDelJuego() {
    this.physics.pause(); // Detener físicas
    this.jugador.setTint(0xff0000); // Cambiar color del jugador
    this.botonReiniciar.setVisible(true); // Mostrar botón para reiniciar
    this.temporizador.remove(); // Detener el temporizador para que no siga restando tiempo
  }
}