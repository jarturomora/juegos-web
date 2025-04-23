# Tema 6: Interacciones Personajes y el Elementos del Juego

## Objetivos de Aprendizaje

* Aprender a cargar _tiles_ y _tilemaps_ y optimizarlos para su uso en Phaser 3.

* Añadir personajes a un juego con _tilemap_ incluyendo su física y movimiento básico.

## Conceptos Clave

### ¿Qué es un _tile_?

Un _tile_ (baldosa en español) es una imagen, generalmente de tamaño fijo (como 16x16, 32x32 o 64x64 píxeles), que representa una unidad del terreno o del entorno del juego.

Por ejemplo:

* Un _tile_ de césped.

* Un _tile_ de roca.

* Un _tile_ de agua.

* Un _tile_ de borde o esquina.

### ¿Qué es un _tilemap_?

Un _tilemap_ (o mosaico en español) es una composición de muchos _tiles_ colocados en una cuadrícula para formar un escenario completo. Phaser puede usar estos mapas para representar:

* El mundo de un nivel en un juego de plataformas.

* El tablero de un juego de estrategia.

* Laberintos, castillos, pueblos, etc.

### ¿Qué es exactamente la extrusión?

Cuando los _tiles_ se renderizan en la pantalla, el motor gráfico a veces lee píxeles vecinos del _tileset_ al aplicar filtros visuales. Si los _tiles_ están demasiado juntos en la imagen, pueden aparecer bordes incorrectos o “sangrados” visuales. El efecto de extrusión soluciona esto duplicando una fila o columna de píxeles en el borde de cada tile, como una especie de margen de seguridad.

## Código Visto en Clase

* [index.html](code/index.html): Página de inicio del juego.

* [escenaBase.js](code/scripts/escenaBase.js): Código de la escena del juego.

* [jugador.js](code/scripts/jugador.js): Código con la configuración del jugador.

* [main.js](code/scripts/main.js): Código con la configuración del juego.

## Herramientas Complementarias

* [FrameExtruder](https://github.com/lgibson02/FrameExtruder/releases/tag/v1.0): Herramienta para aplicar el efecto de extrusión en los _tilemap_. Al ejecutarla, es posible que tu ordenador la detecte como un virus, pero puedes ejecutarla sin riesgo. De manera complementaria, en Windows, es posible que requieras actualizar el .Net Framework; esta actualización puede tardar hasta 40 minutos.

* [Tiled Map Editor](https://www.mapeditor.org/): Herramienta para crear mapas para nuestros juegos de manera visual.

## Recursos Adicionales

* [Documentación de `Tilemap` en Phaser 3.8X](https://docs.phaser.io/api-documentation/class/tilemaps-tilemap): Aquí explica como funciona la función `createLayer`.

* [Simplified Platformer Pack](https://www.kenney.nl/assets/simplified-platformer-pack)

* [Platformer Art Extended Enemies](https://www.kenney.nl/assets/platformer-art-extended-enemies)