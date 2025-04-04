# Tema 4: Introducción a Phaser

## Configuración del Entorno de Desarrollo

Para crear juegos en Phaser utilizaremos las siguientes herramientas:

* [Visual Studio Code (VSCode)](https://code.visualstudio.com/) como editor de código y entorno integrado de desarrollo.

* La extensión [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) de VSCode para ejecutar un servidor web de prueba y visualizar nuestros juegos en el editor o en el navegador web.

* [Phaser v3.88.2](https://phaser.io/download/stable) que es la versión más reciente al momento de crear este documento.

## Comentarios Sobre la Versión de Phaser a Utilizar

Si bien es posible descargar Phaser y tenerlo como un fichero local, para los ejemplos de este repositorio utilizaremos la versión "reducida (minified)" disponible a través de los servidores web provistos por los desarrolladores de esta librería en las siguientes URL:

```text

https://cdnjs.cloudflare.com/ajax/libs/phaser/3.88.2/phaser.min.js

https://cdn.jsdelivr.net/npm/phaser@v3.88.2/dist/phaser.min.js
```

## Código Visto en Clase

* [hola-phaser.html](code/hola-phaser.html): Ejemplo para comprobar que Phaser esta funcionando.

* [Estructura básica de un juego en Phaser](code/estructura-juego/)

* [Ejemplo de Mini Juego](code/mini-juego/)

* [Documentación de Phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser)

## Actividad de Clase

Llegó el momento de ponerte manos a la obra con Phaser. Tomando como base el ejemplo del "mini juego", consulta la [documentación de Phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser) y modifica el código para conseguir lo siguiente:

1. Utilizar las flechas de arriba y abajo para que el personaje se mueva hacia dichas direcciones.

2. Captura el evento de presionar las teclas A, S, D y W para mover el personaje de la siguiente manera:

    * A - Izquierda

    * D - Derecha

    * S - Abajo

    * W - Arriba

## Recursos Adicionales

* [Repositorio de Phaser en GitHub](https://github.com/phaserjs/phaser)

* [Ejemplos de Phaser](https://phaser.io/examples/)

## Puntos Clave

### **Directiva `defer` al Momento de Cargar un Script**

El uso de `defer` es una práctica recomendada para cargar scripts externos como los juegos en Phaser. Esta práctica nos asegura que todo el contenido HTML esté listo antes de que comience la ejecución del código.

**¿Qué ventajas tiene usar `defer`?**

1. **Evita errores de acceso al DOM:**  
    El script no se ejecuta hasta que todos los elementos HTML han sido cargados, lo que es útil si el JavaScript necesita acceder a ellos (como el `<canvas>` que crea Phaser).

2. **Mejora la velocidad de carga:**  
    Como el script se descarga en paralelo sin bloquear el parseo del HTML, la página se renderiza más rápido.

3. **Orden de ejecución garantizado:**  
    Si hay varios scripts con `defer`, se ejecutan en el orden en que aparecen en el HTML.

**¿Qué pasa si no lo pones?**

Si no usas `defer` y colocas el `<script>` en el `<head>`, el navegador _detendrá la carga del HTML_ para descargar y ejecutar el script _inmediatamente_. Esta acción que puede causar errores si el DOM aún no está listo.

Si no quieres utilizar `defer`, una alternativa es colocar el `<script>` al final del `<body>`. Pero, sin lugar a dudas, usar `defer` te ayudará a mantener el HTML más limpio y controlado.

### En el mini-juego ¿en que unidades de medida son los pasos?

En el contexto de este juego en Phaser, cuando decimos que el personaje se mueve con:

```javascript
player.x += 2;
```

Estamos moviéndolo **2 píxeles por fotograma** en el eje X (horizontal) o eje Y (vertical). Entonces, el contador `pasos` que estamos usando _no cuenta pasos humanos_, sino que cuenta _cuántos píxeles se ha desplazado el personaje_, acumulados por cada fotograma en el que hay movimiento.
