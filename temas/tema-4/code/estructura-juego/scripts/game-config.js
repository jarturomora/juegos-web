var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  /*
  Preparar los recursos: Esta función se ejecuta antes de que comience el juego. Su propósito es cargar
  todos los recursos que necesitarás durante la escena (imágenes, sprites, audio, mapas, fuentes, etc.).
  */
}

function create() {
  /*
  Construir la escena: Esta función se ejecuta una vez, justo después de que preload ha terminado y 
  todos los recursos están listos. Aquí es donde creas los elementos del juego: fondos, personajes, botones,
  física, animaciones, etc.
  */
}

function update() {
  /*
   Lógica del juego en tiempo real: Esta función se ejecuta en bucle, una vez por frame
   (normalmente 60 veces por segundo). Aquí se define la lógica dinámica del juego, como movimientos,
   colisiones, condiciones de victoria/derrota, etc.
  */
}
