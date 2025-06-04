// Exportamos la clase Enemigo para poder usarla en otras partes del juego
export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    // Llamamos al constructor de la clase Sprite con la textura 'enemigo'
    super(escena, x, y, 'enemigo');

    // Guardamos una referencia a la escena
    this.escena = escena;

    // Añadimos el sprite del enemigo a la escena
    this.escena.add.existing(this);

    // Habilitamos las físicas para que el enemigo pueda moverse y colisionar
    this.escena.physics.add.existing(this);

    // Hacemos que el enemigo rebote al chocar contra los bordes del mundo
    this.setCollideWorldBounds(true);
    this.setBounce(1); // Rebote completo (100%)

    // Asignamos una velocidad aleatoria al enemigo al crearse
    // Esto hace que se mueva automáticamente
    const velocidadX = Phaser.Math.Between(-150, 150);
    const velocidadY = Phaser.Math.Between(-150, 150);
    this.setVelocity(velocidadX, velocidadY);
  }

  // No necesitamos lógica adicional en el update, ya que el enemigo rebota solo
  update() {
    // Podríamos agregar aquí comportamiento adicional en el futuro
  }
}
