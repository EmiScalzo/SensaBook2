// Función para crear el perfil
function crearPerfil() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username && password) {
      // Guardar el nombre de usuario en localStorage
      localStorage.setItem('username', username);

      // Mostrar un mensaje de éxito
      alert("Perfil creado exitosamente.");

      // Redirigir al usuario a la página de inicio
      window.location.href = "index.html";
  } else {
      alert("Por favor, completa todos los campos.");
  }
}

// Almacenar los últimos estados en localStorage
function cargarEstadosPrevios() {
  var estados = JSON.parse(localStorage.getItem('ultimosEstados')) || [];
  return estados;
}

function guardarEstados(estados) {
  localStorage.setItem('ultimosEstados', JSON.stringify(estados));
}

// Función para enviar el estado emocional
function enviarEstado() {
  var estado = document.getElementById("estado-animo").value;
  var razon = document.getElementById("razon").value;
  var estadoActual = document.getElementById("estado-actual");
  var username = localStorage.getItem('username');

  if (estado && username) {
      estadoActual.innerHTML = estado;

      var nuevoEstado = {
          usuario: username,
          estado: estado,
          razon: razon
      };

      var estados = cargarEstadosPrevios();
      estados.push(nuevoEstado);
      guardarEstados(estados);
      mostrarEstados();

      recomendarHistoria(estado);
  } else {
      alert("Por favor, escribe tu estado de ánimo.");
  }
}

function mostrarEstados() {
  var estados = cargarEstadosPrevios();
  var ultimosEstadosDiv = document.getElementById("ultimos-estados");
  ultimosEstadosDiv.innerHTML = ''; 

  estados.forEach(function(estadoObj) {
      var estadoElement = document.createElement("p");
      estadoElement.innerHTML = `<strong>${estadoObj.usuario}</strong> se siente <strong>${estadoObj.estado}</strong>${estadoObj.razon ? ' porque ' + estadoObj.razon : ''}.`;
      ultimosEstadosDiv.appendChild(estadoElement);
  });
}

// Cargar los estados al cargar la página
document.addEventListener("DOMContentLoaded", mostrarEstados);

// Recomendación basada en palabras clave
function recomendarHistoria(estado) {
  var historias = JSON.parse(localStorage.getItem('historiasPublicadas')) || [];
  var recomendacion = document.getElementById("post-recommendation");
  recomendacion.innerHTML = "";

  var coincidencias = historias.filter(historia => {
      var palabrasClave = historia.palabrasClave.toLowerCase().split(",").map(palabra => palabra.trim());
      return palabrasClave.some(palabra => estado.toLowerCase().includes(palabra));
  });

  if (coincidencias.length > 0) {
      // Generar un enlace que redirija al post
      var historiaRecomendada = coincidencias[0];
      var link = `<a href="ver-post.html?id=${historias.indexOf(historiaRecomendada)}">${historiaRecomendada.titulo}</a>`;
      recomendacion.innerHTML = `<p>Tal vez esto pueda servirte: ${link}</p>`;
  } else {
      recomendacion.innerHTML = "<p>Sigue adelante, ¡estás haciendo un gran trabajo!</p>";
  }
}
