function mostrarFechaHora() {
  const fechaHora = new Date();
  const formato = fechaHora.toLocaleString();
  document.getElementById("fechaHora").textContent = "Fecha y hora actual: " + formato;
  //document.getElementById("fechaHora").textContent = `Fecha y hora actual: ${formato}`;
}
