export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    super(escena, x, y, 'enemigo');
    this.escena = escena;
    this.escena.add.existing(this);
    this.escena.physics.add.existing(this);

    // Rebotar en colisiones con el mundo
    this.setCollideWorldBounds(true);
    this.setBounce(1);

    // Velocidad inicial aleatoria
    const velocidad = 150;
    const dirX = Phaser.Math.Between(-1, 1) || 1;
    const dirY = Phaser.Math.Between(-1, 1) || 1;
    this.setVelocity(dirX * velocidad, dirY * velocidad);
  }

  update() {
    // Nada necesario aquí por ahora, el rebote lo maneja Phaser
  }
}
