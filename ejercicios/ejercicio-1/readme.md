# Ejercicio de Refuerzo 1: Juego con _tilemap_ y un enemigo

Este ejercicio se basa en el código del [Tema 6](../../temas/tema-6/readme.md). Para añadir más interacción, se añade un enemigo que se mueve de manera aleatoria por la plataforma siguiendo las siguientes reglas:

* El enemigo se comporta como una pelota rebotando por el escenario.

* El rebote se activa con `setBounce(1)` y `setCollideWorldBounds(true)`.

* Se usa `Phaser.Math.Between()` para darle dirección aleatoria inicial.

* Si toca al jugador, se reinicia la escena con `this.scene.restart()`.
