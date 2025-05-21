// Definición de la clase Gema, que representa una gema en el juego
export class Gema extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    // Llama al constructor de la clase Sprite con la textura 'gema'
    super(escena, x, y, 'gema');
    // Añade la gema a la escena
    escena.add.existing(this);
    // Añade el cuerpo físico de la gema a la escena
    escena.physics.add.existing(this);
    // Hace que la gema rebote al colisionar
    this.setBounce(0.5);
    // Limita la gema a los bordes del mundo
    this.setCollideWorldBounds(true);
    // Desactiva la gravedad para la gema
    this.body.allowGravity = false;
  }
}

// Función para crear un grupo de gemas usando la clase Gema
export function crearGemas(escena, cantidad, mapa) {
  // Crea un grupo físico para las gemas
  const grupoGemas = escena.physics.add.group();
  // Genera la cantidad de gemas indicada en posiciones aleatorias
  for (let i = 0; i < cantidad; i++) {
    // Calcula una posición aleatoria dentro de los límites del mapa
    const x = Phaser.Math.Between(100, mapa.widthInPixels - 100);
    const y = Phaser.Math.Between(100, 400);
    // Crea una nueva gema y la añade al grupo
    const gema = new Gema(escena, x, y);
    grupoGemas.add(gema);
  }
  // Devuelve el grupo de gemas creado
  return grupoGemas;
}