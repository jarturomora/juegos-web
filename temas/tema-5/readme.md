# Tema 5: Gestión de Elementos y Física Básica de Arcade de un Juego en Phaser

## Objetivos de Aprendizaje

* Cómo modularizar el código en clases y archivos separados.

* Uso de físicas arcade y colisiones en Phaser.

* Control de personaje con teclado y comportamiento automático de enemigos.

* Cómo reiniciar la escena tras una condición (colisión).

## Conceptos Clave

### Uso de scripts en HTML y la ventaja de los módulos

En el desarrollo web moderno, una forma común de incluir archivos JavaScript en nuestras páginas es mediante la etiqueta `<script>` en el archivo HTML. Esta etiqueta le indica al navegador que debe cargar y ejecutar un archivo JavaScript específico.

Por ejemplo:

```html
<script src="personaje1.js"></script>
```

Esta instrucción carga el archivo `personaje1.js` y lo ejecuta inmediatamente. Si tienes varios scripts, el navegador los procesará en el orden en que aparecen en el HTML. Sin embargo, este enfoque tiene algunas limitaciones, sobre todo cuando trabajamos en proyectos con varios archivos o necesitamos reutilizar código.

Para solucionar esto, HTML5 introdujo una mejora muy importante: la posibilidad de definir scripts como _módulos_. Esto se logra usando el atributo `type="module"`:

Por ejemplo:

```html
<script type="module" src="main.js"></script>
```

Al declarar un script como módulo, podemos utilizar en JavaScript las instrucciones modernas `import` y `export`. Esto nos permite dividir el código en archivos separados (por ejemplo, clases para distintos personajes o escenas) y luego importar solo lo que necesitamos en cada lugar. Así, nuestro código es más limpio, fácil de mantener y escalable.

Por ejemplo, en main.js podríamos importar una escena así:

```javascript
import EscenaBase from './escenaBase.js';
```

Y esa clase podría haber sido exportada en escenaBase.js con:

```javascript
export default class EscenaBase { ... }
```

Este enfoque modular es el más recomendable en el desarrollo moderno con Phaser 3, especialmente si estás organizando tu juego en distintas escenas, personajes y componentes.

## Código Visto en Clase

* [index.html](code/index.html): Página principal del juego.

* [main.js](code/scripts/main.js): Configuración del juego.

* [escenaBase.js](code/scripts/escenaBase.js): Código de la escena base.

* [personaje1.js](code/scripts/personaje1.js): Código con la lógica del personaje del jugador, el cuál, se puede mover con las flechas del teclado.

* [personaje2.js](code/scripts/personaje2.js): Código con la lógica del personaje del enemigo, el cuál, se mueve automáticamente rebotando cuando el sprite colisiona con los bordes del área de juego.

## Recursos Adicionales

* [Librería de elementos "Platformer Pack Redux"](https://kenney.nl/assets/platformer-pack-redux)
