// Variable global para contar los pasos (izquierda o derecha)
let pasos = 0;

// Configuración general del juego Phaser
const config = {
    type: Phaser.AUTO, // Usa WebGL si está disponible, si no usa Canvas
    width: 800,        // Ancho del lienzo del juego
    height: 600,       // Alto del lienzo del juego
    backgroundColor: '#87CEEB', // Color de fondo (azul claro)

    // Activar sistema de físicas arcade (simple y eficiente)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sin gravedad (movimiento solo en 2D horizontal)
            debug: false       // Modo de depuración desactivado
        }
    },

    // Escena del juego con las tres funciones principales
    scene: {
        preload,  // Carga de recursos
        create,   // Configuración inicial de la escena
        update    // Bucle que se repite constantemente (lógica del juego)
    }
};

// Variables que se usan dentro de la escena
let player;         // El personaje controlado por el jugador
let cursors;        // Objeto para detectar teclas (flechas)
let textoPasos;     // Texto que muestra los pasos
let sonidoInicio;   // Sonido que se reproduce al iniciar

// Crear el juego
const game = new Phaser.Game(config);

// Función preload: se usa para cargar archivos antes de iniciar el juego
function preload() {
    // Imagen del jugador (sprite)
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/sonic.png');

    // Sonido corto al iniciar el juego
    this.load.audio('start', 'https://labs.phaser.io/assets/audio/SoundEffects/key.wav');
}

// Función create: se ejecuta una vez, cuando ya se han cargado los recursos
function create() {
    // Añadir el sprite del jugador en el centro de la pantalla
    player = this.physics.add.sprite(400, 300, 'player');

    // Escalar el personaje (opcional)
    player.setScale(1.5);

    // Activar las teclas de flechas (izquierda, derecha, arriba, abajo)
    cursors = this.input.keyboard.createCursorKeys();

    // Mostrar texto inicial del contador de pasos
    textoPasos = this.add.text(20, 20, 'Pasos: 0', {
        font: '20px Arial',
        fill: '#ffffff'
    });

    // Cargar y reproducir el sonido de inicio
    sonidoInicio = this.sound.add('start');
    sonidoInicio.play();
}

// Función update: se ejecuta 60 veces por segundo
// Aquí va la lógica que cambia continuamente (como mover al jugador)
function update() {
    let movimiento = false; // Variable para detectar si se ha movido

    // Si el jugador presiona la flecha izquierda
    if (cursors.left.isDown) {
        player.x -= 2; // Mover a la izquierda
        movimiento = 'izquierda';
    }
    // Si el jugador presiona la flecha derecha
    else if (cursors.right.isDown) {
        player.x += 2; // Mover a la derecha
        movimiento = 'derecha';
    }

    // Si se detecta movimiento, aumentar el contador de pasos
    if (movimiento) {
        pasos++;
        textoPasos.setText('Pasos: ' + pasos); // Actualizar el texto
    }
}