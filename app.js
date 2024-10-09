// Redireccionar a las páginas correspondientes
function goToInicio() {
  window.location.href = 'inicio.html';
}

function goToBlog() {
  window.location.href = 'blog.html';
}

function goToProfile() {
  window.location.href = 'perfil.html';
}

// Manejar el envío del estado
document.getElementById('estadoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const estado = document.getElementById('estado').value;
  const razon = document.getElementById('razon').value;
  
  if (!estado) {
      alert("Por favor, ingresa un estado de ánimo.");
      return;
  }

  // Guardar el estado y razón
  guardarEstado(estado, razon);
  
  // Generar la recomendación
  const recomendacion = generarRecomendacion(estado);
  document.getElementById('recomendacion').innerHTML = recomendacion;

  // Actualizar el historial de estados
  cargarHistorial();
});

// Guardar el estado en localStorage
function guardarEstado(estado, razon) {
  let historial = JSON.parse(localStorage.getItem('historial')) || [];
  historial.push({ estado, razon });
  localStorage.setItem('historial', JSON.stringify(historial));
}

// Generar la recomendación
function generarRecomendacion(estado) {
  // Aquí se podrían agregar recomendaciones más complejas basadas en un archivo JSON del blog
  const recomendaciones = {
      "Triste": "Tal vez esto pueda servirte: *link a un posteo en el blog sobre superar dificultades*",
      "Feliz": "Tal vez esto pueda inspirarte: *link a una historia de éxito*",
      "Ansioso": "Visita nuestra subpágina de superación de dificultades laborales."
  };

  return recomendaciones[estado] || "Sigue adelante, lo estás haciendo bien. ¡Visita nuestra subpágina!";
}

// Cargar el historial de estados previos
function cargarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historial')) || [];
  const historialContainer = document.getElementById('historialEstados');
  
  historialContainer.innerHTML = '';
  historial.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.estado} - ${item.razon || 'Sin razón'}`;
      historialContainer.appendChild(div);
  });
}

// Cargar el historial al iniciar la página
cargarHistorial();
