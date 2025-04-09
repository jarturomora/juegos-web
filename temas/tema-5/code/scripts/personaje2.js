export default class Personaje2 {
  constructor(scene, x, y) {
      this.scene = scene;

      // Crear el sprite del personaje y activarle físicas arcade
      this.sprite = scene.physics.add.sprite(x, y, 'personaje2');

      // Activar los bordes del mundo como límites del personaje
      this.sprite.setCollideWorldBounds(true);

      // Hacer que rebote automáticamente al chocar con los límites
      this.sprite.setBounce(1);

      // Darle una velocidad inicial en diagonal
      this.sprite.setVelocity(150, 120);
  }

  update() {
      // En este caso no necesitamos lógica en update,
      // el rebote se maneja automáticamente con `setBounce(1)`
      // y el personaje sigue rebotando dentro del área de juego
  }
}
