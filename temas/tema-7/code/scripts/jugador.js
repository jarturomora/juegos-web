export default class Jugador extends Phaser.Physics.Arcade.Sprite {
  // Constructor de la clase Jugador
  constructor(escena, x, y) {
    // Llama al constructor de la clase padre (Phaser.Physics.Arcade.Sprite)
    // 'jugador' es la clave de la imagen cargada en preload
    super(escena, x, y, 'jugador');

    // Guarda una referencia a la escena donde se crea el jugador
    this.escena = escena;

    // Añade el sprite del jugador a la escena
    this.escena.add.existing(this);

    // Añade el cuerpo físico del jugador a la escena para que tenga físicas
    this.escena.physics.add.existing(this);

    // Configura el teclado para capturar las flechas
    this.cursors = this.escena.input.keyboard.createCursorKeys();

    // Configura la animación de andar del jugador
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

    // Configura la animación De Pie
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

    // Configura la animación Salto
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

  // Método update que maneja la lógica de movimiento del jugador
  update() {
    // Velocidad horizontal del jugador
    const velocidad = 200;

    // Velocidad del salto
    const velocidadSalto = 500;

    // Invertir jugador dependiendo velocidad
    if (this.body.velocity.x > 0 ) {
      this.setFlipX(false); 
    }else if (this.body.velocity.x < 0 ) {
      this.setFlipX(true); 
    }

    // Movimiento hacia la izquierda
    if (this.cursors.left.isDown) {
      this.setVelocityX(-velocidad);
      if (this.body.onFloor() ){
        this.play('spr_andando', true);
      }
    }
    // Movimiento hacia la derecha
    else if (this.cursors.right.isDown) {
      this.setVelocityX(velocidad);
      if (this.body.onFloor()){
        this.play('spr_andando', true);
      }
    } else {
      // Si no se presiona ninguna tecla, detener el movimiento
      this.setVelocityX(0);
      if (this.body.onFloor() ){
        this.play('spr_depie', true);
      }
    }

    // Movimiento del salto
    if (this.cursors.space.isDown && this.body.onFloor()) {
      this.setVelocityY(-velocidadSalto);
      this.play('spr_salto', true)
    }
  }
}