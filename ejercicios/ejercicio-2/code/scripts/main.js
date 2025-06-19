import EscenaMemoria from "./EscenaMemoria.js";

// Configuración general del juego
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  scene: EscenaMemoria,
};

// Crear el juego con la configuración
const game = new Phaser.Game(config);
