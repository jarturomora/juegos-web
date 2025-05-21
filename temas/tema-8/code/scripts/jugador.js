// Definimos una clase Jugador que extiende de Sprite con físicas arcade
export default class Jugador extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y, sonidoSalto) {
    // Inicializamos el sprite con la imagen 'jugador'
    super(escena, x, y, 'jugador');

    this.escena = escena; // Guardamos una referencia a la escena

    // Añadimos el sprite y sus físicas a la escena
    this.escena.add.existing(this);
    this.escena.physics.add.existing(this);

    // Capturamos las teclas del cursor (flechas)
    this.cursors = this.escena.input.keyboard.createCursorKeys();

    // Guardamos una referencia al sonido de salto
    this.sonidoSalto = sonidoSalto;

    // Configuración de animación para caminar
    this.animacionAndar =  {}
    this.animacionAndar.key = 'spr_andando';
    this.animacionAndar.frames = this.escena.anims.generateFrameNames('spr_player', {
        prefix: 'spr_andando',
        start: 1,
        end: 2,
      });
    this.animacionAndar.frameRate = 10;
    this.animacionAndar.repeat = -1;
    this.escena.anims.create(this.animacionAndar);

    // Animación para estar de pie
    this.animacionDePie = {}
    this.animacionDePie.key = 'spr_depie';
    this.animacionDePie.frames = this.escena.anims.generateFrameNames('spr_player', {
      prefix: 'spr_depie',
      start: 1,
      end: 1,
    });
    this.animacionDePie.frameRate = 10;
    this.animacionDePie.repeat = -1;
    this.escena.anims.create(this.animacionDePie);

    // Animación de salto
    this.animacionSalto = {}
    this.animacionSalto.key = 'spr_salto';
    this.animacionSalto.frames = this.escena.anims.generateFrameNames('spr_player', {
      prefix: 'spr_salto',
      start: 1,
      end: 1,
    });
    this.animacionSalto.frameRate = 10;
    this.animacionSalto.repeat = -1;
    this.escena.anims.create(this.animacionSalto);
  }

  // Método update que se ejecuta en cada fotograma del juego
  update() {
    const velocidad = 200;        // Velocidad horizontal
    const velocidadSalto = 500;   // Fuerza del salto

    // Cambiar orientación del sprite dependiendo del movimiento
    if (this.body.velocity.x > 0) this.setFlipX(false);
    else if (this.body.velocity.x < 0) this.setFlipX(true);

    // Movimiento lateral con flechas
    if (this.cursors.left.isDown) {
      this.setVelocityX(-velocidad); // Izquierda     
      if (this.body.onFloor()) this.play('spr_andando', true); // Reproducir animación de andar
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(velocidad); // Derecha
      if (this.body.onFloor()) this.play('spr_andando', true); // Reproducir animación de andar
    } else {
      this.setVelocityX(0); // Detener movimiento horizontal
      if (this.body.onFloor()) this.play('spr_depie', true); // Reproducir animación de estar de pie
    }

    // Salto cuando está en el suelo y se presiona ESPACIO
    if (this.cursors.space.isDown && this.body.onFloor()) {
      this.setVelocityY(-velocidadSalto);
      this.play('spr_salto', true); // Reproducir animación de salto
      this.sonidoSalto.play(); // Reproducir sonido de salto
    }
  }
}