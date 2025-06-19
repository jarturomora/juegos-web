import Carta from './Carta.js';

export default class EscenaMemoria extends Phaser.Scene {
  constructor() {
    super({ key: 'EscenaMemoria' });
    this.cartas = [];
    this.cartasAbiertas = [];
  }

  preload() {
    // Cargamos la imagen del reverso y las 5 cartas
    this.load.image('reverso', 'assets/reverso.png');
    for (let i = 1; i <= 5; i++) {
      this.load.image('carta' + i, 'assets/carta' + i + '.png');
    }
  }

  create() {
    // Creamos 5 pares de cartas (10 cartas)
    const pares = ['carta1', 'carta2', 'carta3', 'carta4', 'carta5'];
    let mazo = pares.concat(pares); // Duplicamos para formar parejas
    Phaser.Utils.Array.Shuffle(mazo); // Mezclamos las cartas

    const columnas = 5;
    const espaciadoX = 150;
    const espaciadoY = 200;
    const offsetX = 100;
    const offsetY = 150;

    // Posicionamos las cartas en una cuadrícula
    mazo.forEach((nombre, i) => {
      const x = offsetX + (i % columnas) * espaciadoX;
      const y = offsetY + Math.floor(i / columnas) * espaciadoY;
      const carta = new Carta(this, x, y, nombre, nombre);
      this.cartas.push(carta);
    });
  }

  // Método que se llama cuando el jugador selecciona una carta
  // Aquí es donde se maneja la lógica del juego
  cartaSeleccionada(carta) {
    this.cartasAbiertas.push(carta);  // 1. Guardamos la carta que el jugador acaba de abrir

    if (this.cartasAbiertas.length === 2) {  // 2. Solo procesamos si hay dos cartas abiertas
      this.time.delayedCall(1000, () => {   // 3. Esperamos 1 segundo antes de continuar
        const [c1, c2] = this.cartasAbiertas;  // 4. Tomamos las dos cartas seleccionadas

        if (c1.id === c2.id) {  // 5. Si las cartas son iguales...
          c1.marcarPareada();   //    Las marcamos como pareadas
          c2.marcarPareada();
        } else {                // 6. Si no son iguales...
          c1.ocultar();         //    Las volteamos de nuevo
          c2.ocultar();
        }

        this.cartasAbiertas = [];  // 7. Limpiamos la lista para poder seleccionar otras dos
      });
    }
  }
}