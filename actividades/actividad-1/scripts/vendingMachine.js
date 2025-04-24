// Clase principal que modela una máquina expendedora
class VendingMachine {
  constructor() {
    // Saldo actual de la máquina
    this.saldo = 0;

    // Productos disponibles en la máquina con precio y stock
    this.productos = {
      Chips: { precio: 2, stock: 5 },
    };
  }

  // Método para actualizar la interfaz con el saldo actual y el mensaje
  actualizarInterfaz() {
    // Actualiza el texto que muestra el saldo
    document.getElementById("saldo").textContent = `Saldo: ${this.saldo}€`;
    // Limpia el mensaje mostrado
    document.getElementById("mensaje").textContent = "";
  }

  // Método para introducir monedas
  introducirMoneda(monto) {
    // Aumenta el saldo con el monto introducido
    this.saldo += monto;
    // Llama al método para actualizar la interfaz
    this.actualizarInterfaz();
  }

  // Método para seleccionar un producto
  seleccionarProducto(producto) {
    // Verifica si el producto existe
    if (!this.productos[producto]) {
      document.getElementById("mensaje").textContent =
        "Producto no disponible.";
      return; // Detiene la ejecución si no se encuentra el producto
    }

    // Verifica si el saldo es suficiente para comprar el producto
    if (this.saldo < this.productos[producto].precio) {
      document.getElementById("mensaje").textContent = "Saldo insuficiente.";
      return; // Detiene la ejecución si el saldo es insuficiente
    }

    // Verifica si el producto tiene stock disponible
    if (this.productos[producto].stock <= 0) {
      document.getElementById("mensaje").textContent = "Producto agotado.";
      return; // Detiene la ejecución si el producto está agotado
    }

    // Resta el precio del producto al saldo
    this.saldo -= this.productos[producto].precio;
    // Resta una unidad del stock del producto
    this.productos[producto].stock -= 1;
    // Actualiza la interfaz para reflejar los cambios
    this.actualizarInterfaz();
    // Muestra un mensaje indicando la compra exitosa
    document.getElementById(
      "mensaje"
    ).textContent = `Has comprado ${producto}.`;
  }

  // Método para devolver el saldo al usuario
  solicitarDevolucion() {
    // Muestra un mensaje indicando la cantidad devuelta
    document.getElementById(
      "mensaje"
    ).textContent = `Devolviendo ${this.saldo}€.`;
    // Reinicia el saldo a 0
    this.saldo = 0;
    // Actualiza la interfaz después de reiniciar el saldo
    this.actualizarInterfaz();
  }
}

// Instancia de la máquina expendedora para interactuar con los botones en la página
const maquina = new VendingMachine();
