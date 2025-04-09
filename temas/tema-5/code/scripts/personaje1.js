export default class Personaje1 {
  constructor(scene, x, y) {
      this.scene = scene;

      // Crear sprite y activar físicas
      this.sprite = scene.physics.add.sprite(x, y, 'personaje1');
      this.sprite.setCollideWorldBounds(true); // No salir de los bordes

      // Crear cursores (flechas del teclado)
      this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
      // Velocidad base
      this.sprite.setVelocity(0);

      if (this.cursors.left.isDown) {
          this.sprite.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
          this.sprite.setVelocityX(160);
      }

      if (this.cursors.up.isDown) {
          this.sprite.setVelocityY(-160);
      } else if (this.cursors.down.isDown) {
          this.sprite.setVelocityY(160);
      }
  }
}
