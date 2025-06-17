// Importamos las clases necesarias del proyecto
import Jugador from './jugador.js';
import Enemigo from './enemigo.js';
import { crearGemas } from './gemas.js';

export default class EscenaBase extends Phaser.Scene {
  constructor() {
    super({ key: 'EscenaBase' }); // Le damos un nombre interno a la escena
  }

  preload() {
    // Cargamos todos los recursos del juego antes de que comience

    // Mapas y tileset
    this.load.image('tilesheet', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/mapa.json');

    // Sprites
    this.load.image('jugador', 'assets/prota.png');
    this.load.image('enemigo', 'assets/enemigo.png');
    this.load.image('gema_roja', 'assets/gema_roja.png');
    this.load.image('gema_verde', 'assets/gema_verde.png');
    this.load.image('gema_naranja', 'assets/gema_naranja.png');
    this.load.image('corazon', 'assets/corazon.png');

    // Cargar atlas para el jugador
    this.load.atlas('spr_player', 'assets/spr_player.png', 'assets/spr_player_atlas.json');

    // Sonidos
    this.load.audio('salto', 'assets/jump.mp3');
    this.load.audio('recolectar', 'assets/pickup.mp3');
    this.load.audio('musica', 'assets/music.mp3');
    this.load.audio('lose', 'assets/lose.mp3');

  }

  create() {
    // Configuramos el mundo del juego

    // Cargamos el mapa y la capa de plataformas
    const mapa = this.make.tilemap({ key: 'map' });
    const tiles = mapa.addTilesetImage('tiles', 'tilesheet', 64, 64, 1, 2);
    const plataformas = mapa.createLayer('plataformas', tiles, 0, 0);
    plataformas.setCollisionByExclusion(-1, true); // Hacemos sólidas las plataformas

    // Ajustar los límites del mundo físico al tamaño del tilemap
    this.physics.world.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);

    // Reproducimos la música de fondo
    this.musica = this.sound.add('musica', { loop: true, volume: 0.5 });
    this.musica.play(); // Se reiniciará cada vez que la escena se reinicie

    // Cargamos los sonidos
    this.sonidoSalto = this.sound.add('salto');
    this.sonidoRecolectar = this.sound.add('recolectar');
    this.sonidoPerder = this.sound.add('lose');

    // Creamos el jugador
    this.jugador = new Jugador(this, 300, 200, this.sonidoSalto);
    this.jugador.setScale(0.5); // Cambia la escala al 50%
    this.jugador.setCollideWorldBounds(true); // No puede salirse del mundo
    this.physics.add.collider(this.jugador, plataformas); // Colisiona con plataformas

    // Creamos el enemigo que se mueve aleatoriamente
    this.enemigo = new Enemigo(this, 500, 100);
    this.enemigo.setScale(0.5); // Cambia la escala al 50%
    this.physics.add.collider(this.enemigo, plataformas);
    this.physics.add.overlap(this.jugador, this.enemigo, this.colisionEnemigo, null, this);
    
    // Crear grupo de gemas usando la función importada
    this.gemas = crearGemas(this, 200, mapa);
    this.physics.add.collider(this.gemas, plataformas); // Colisión entre gemas y plataformas
    this.physics.add.overlap(this.jugador, this.gemas, this.recolectarGema, null, this); // Colisión entre jugador y gemas

    // Control de camaras
    this.cameras.main.startFollow(this.jugador);  // Seguir al jugador
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels); // Limitar la cámara al mapa 

    // Variables de juego
    this.puntos = 0;
    this.tiempo = 120;
    this.vidas = 3;

    // Texto en pantalla
    this.txtPuntos = this.add.text(20, 20, 'Puntos: 0', { fontSize: '20px', fill: '#fff' });
    this.txtTiempo = this.add.text(20, 50, 'Tiempo: 120', { fontSize: '20px', fill: '#fff' });

    // Mostrar corazones en pantalla (vidas)
    this.iconosVida = [];
    for (let i = 0; i < this.vidas; i++) {
      const corazon = this.add.image(30 + i * 35, 90, 'corazon').setScale(0.5);
      this.iconosVida.push(corazon);
    }

    // Temporizador que cuenta regresivamente
    this.temporizador = this.time.addEvent({
      delay: 1000,         // Cada segundo
      callback: () => {
        this.tiempo--;     // Restamos tiempo
        this.txtTiempo.setText('Tiempo: ' + this.tiempo);
        if (this.tiempo <= 0) this.finDelJuego();
      },
      callbackScope: this,
      loop: true
    });

    // Botón para reiniciar el juego (oculto al inicio))
    this.botonReiniciar = this.add.text(500, 300, 'Reiniciar (ENTER)', {
      fontSize: '30px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setInteractive().setVisible(false); // Oculto al inicio

    // Reiniciar al hacer clic
    this.botonReiniciar.on('pointerdown', () => this.scene.restart());

    // Capturar la tecla ENTER
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    // Fijar el texto a la cámara
    this.txtPuntos.setScrollFactor(0);
    this.txtTiempo.setScrollFactor(0);
    this.botonReiniciar.setScrollFactor(0);

    // Fijar el texto de vidas a la cámara
    this.iconosVida.forEach(corazon => {
      corazon.setScrollFactor(0);
    });

    this.invulnerable = false; // El jugador no es invulnerable al inicio
  }

  update() {
    // Actualización continua del juego

    if (this.tiempo > 0 && this.vidas > 0) {
      this.jugador.update(); // Solo si el juego está activo
    } else if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.scene.restart(); // Permite reiniciar el juego con ENTER
    }
  }

  // Funciones auxiliares

  // Función para recolectar gemas
  recolectarGema(jugador, gema) {
    gema.disableBody(true, true); // Ocultamos la gema
    this.sonidoRecolectar.play(); // Sonido de recoger
    this.puntos += gema.valor;   // Sumamos o restamos puntos según el tipo de gema
    this.txtPuntos.setText('Puntos: ' + this.puntos);
  }

  colisionEnemigo(jugador, enemigo) {
    // Prevenir múltiples llamadas mientras el jugador y el enemigo están superpuestos
    if (this.invulnerable) return;

    // Activar invulnerabilidad temporal (1 segundo)
    this.invulnerable = true;

    // Restar una vida
    this.vidas--;

    this.sonidoPerder.play(); // Sonido de pérdida de vida
    this.jugador.setTint(0xff0000); // Cambia color de jugador a rojo

    // Reiniciar los puntos
    this.puntos = 0;
    this.txtPuntos.setText('Puntos: ' + this.puntos);

    // Ocultar uno de los corazones visualmente
    if (this.iconosVida[this.vidas]) {
      this.iconosVida[this.vidas].setVisible(false);
    }

    // Si ya no quedan vidas, terminar el juego
    if (this.vidas <= 0) {
      this.finDelJuego('¡Te has quedado sin vidas!');
    } else {
      // Programar el fin de la invulnerabilidad dentro de 1000 ms (1 segundo)
      this.time.delayedCall(1000, () => {
        this.invulnerable = false;
        this.jugador.clearTint(); // Restauramos el color original del jugador
      });
    }
  }

  // Función para reiniciar el juego
  finDelJuego(mensaje = '¡Fin del juego!') {
    this.physics.pause(); // Detenemos toda la física
    this.jugador.setTint(0xff0000); // Cambiamos el color del personaje
    this.txtPuntos.setText(mensaje); // Mostramos mensaje de fin
    this.botonReiniciar.setVisible(true); // Mostramos botón de reinicio
    this.temporizador.remove(); // Detener el temporizador para que no siga restando tiempo
    this.musica.stop(); // Detener la música
  }
}
