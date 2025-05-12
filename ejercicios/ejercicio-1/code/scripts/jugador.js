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
  }

  // Método update que maneja la lógica de movimiento del jugador
  update() {
    // Velocidad del jugador
    const velocidad = 200;

    // Movimiento hacia la izquierda
    if (this.cursors.left.isDown) {
      this.setVelocityX(-velocidad);
    }
    // Movimiento hacia la derecha
    else if (this.cursors.right.isDown) {
      this.setVelocityX(velocidad);
    }

    // Movimiento hacia arriba
    if (this.cursors.up.isDown) {
      this.setVelocityY(-velocidad);
    }
    // Movimiento hacia abajo
    else if (this.cursors.down.isDown) {
      this.setVelocityY(velocidad);
    }
  }
}