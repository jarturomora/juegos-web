// Clase base Gema que extiende de Sprite con físicas arcade
class Gema extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y, tipo, textura, valor) {
    super(escena, x, y, textura);

    this.tipo = tipo;    // Tipo de gema: 'roja', 'verde', 'naranja'
    this.valor = valor;  // Valor de la gema (positivo o negativo)

    // Agregar a la escena
    escena.add.existing(this);
    escena.physics.add.existing(this);

    // Configuración de físicas
    this.setBounce(0.5);
    this.setCollideWorldBounds(true);
    this.body.allowGravity = false;
  }
}

// Subclases de Gema para cada tipo

export class GemaRoja extends Gema {
  constructor(escena, x, y) {
    super(escena, x, y, 'roja', 'gema_roja', -1); // Restan 1 punto
  }
}

export class GemaVerde extends Gema {
  constructor(escena, x, y) {
    super(escena, x, y, 'verde', 'gema_verde', 2); // Suman 2 puntos
  }
}

export class GemaNaranja extends Gema {
  constructor(escena, x, y) {
    super(escena, x, y, 'naranja', 'gema_naranja', 3); // Suman 3 puntos
  }
}

// Función para crear y devolver un grupo con múltiples tipos de gemas
export function crearGemas(escena, cantidadTotal, mapa) {
  const grupoGemas = escena.physics.add.group();

  // Distribuir aleatoriamente los tipos de gemas
  for (let i = 0; i < cantidadTotal; i++) {
    const x = Phaser.Math.Between(100, mapa.widthInPixels - 100);
    const y = Phaser.Math.Between(100, 400);
    
    const tipoAleatorio = Phaser.Math.RND.pick(['roja', 'verde', 'naranja']);
    let gema;

    switch (tipoAleatorio) {
      case 'roja':
        gema = new GemaRoja(escena, x, y);
        break;
      case 'verde':
        gema = new GemaVerde(escena, x, y);
        break;
      case 'naranja':
        gema = new GemaNaranja(escena, x, y);
        break;
    }

    grupoGemas.add(gema);
  }

  return grupoGemas;
}
