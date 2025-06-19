// Clase que representa una carta del juego de memoria
export default class Carta extends Phaser.GameObjects.Sprite {
  constructor(escena, x, y, textura, id) {
    super(escena, x, y, 'reverso'); // Mostrar el reverso inicialmente
    this.escena = escena;
    this.id = id; // Identificador de la carta
    this.texturaOriginal = textura; // Textura que representa la carta descubierta

    this.escena.add.existing(this);
    this.setInteractive(); // Hacerla interactiva con el puntero
    this.on('pointerdown', this.revelar, this);

    this.volteada = false;
    this.pareada = false;
  }

  // Revela la carta
  revelar() {
    if (this.volteada || this.pareada) return;
    this.setTexture(this.texturaOriginal);
    this.volteada = true;
    this.escena.cartaSeleccionada(this); // Avisamos a la escena
  }

  // Oculta la carta nuevamente
  ocultar() {
    this.setTexture('reverso');
    this.volteada = false;
  }

  // Marca la carta como emparejada
  marcarPareada() {
    this.pareada = true;
  }
}