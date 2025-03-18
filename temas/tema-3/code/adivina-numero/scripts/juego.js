// Genera un número aleatorio entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Imprime el número secreto en la consola
console.log("Número secreto generado:", numeroSecreto);

// Inicializamos variables
let intentos = 0;

// Función para verificar el número ingresado
function verificarNumero() {
    let numeroUsuario = parseInt(document.getElementById("numero").value);
    let mensaje = document.getElementById("mensaje");

    // Validar que el número esté entre 1 y 100
    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
        mensaje.textContent = "Por favor, introduce un número entre 1 y 100.";
        mensaje.style.color = "red";
        return;
    }

    intentos++; // Contamos el intento

    // Comparar el número ingresado con el número secreto
    if (numeroUsuario === numeroSecreto) {
        mensaje.textContent = `¡Felicidades! Adivinaste el número en ${intentos} intentos.`;
        mensaje.style.color = "green";
    } else if (numeroUsuario < numeroSecreto) {
        mensaje.textContent = "El número es mayor.";
        mensaje.style.color = "blue";
    } else {
        mensaje.textContent = "El número es menor.";
        mensaje.style.color = "blue";
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1; // Nuevo número secreto
    console.log("Número secreto generado:", numeroSecreto); // Imprime el número secreto en la consola
    intentos = 0; // Reiniciar intentos
    document.getElementById("mensaje").textContent = "";
    document.getElementById("numero").value = "";
}

// Código para escuchar el evento "keydown" en el input
document.getElementById("numero").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      verificarNumero(); // Llamar a la función cuando se presiona Enter
  }
});