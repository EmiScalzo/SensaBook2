// Función para publicar una historia
function publicarHistoria() {
  var titulo = document.getElementById("titulo").value;
  var contenido = document.getElementById("contenido").value;
  var palabrasClave = document.getElementById("palabras-clave").value;

  if (titulo && contenido && palabrasClave) {
      var nuevaHistoria = {
          id: Date.now(),  // Generar un ID único basado en el tiempo actual
          titulo: titulo,
          contenido: contenido,
          palabrasClave: palabrasClave
      };

      var historias = JSON.parse(localStorage.getItem('historiasPublicadas')) || [];
      historias.push(nuevaHistoria);
      localStorage.setItem('historiasPublicadas', JSON.stringify(historias));
      alert("Historia publicada exitosamente.");
      mostrarHistoriasPublicadas();
  } else {
      alert("Por favor, completa todos los campos.");
  }
}

// Función para mostrar las historias publicadas con enlaces a los posts completos
function mostrarHistoriasPublicadas() {
  var historias = JSON.parse(localStorage.getItem('historiasPublicadas')) || [];
  var historiasDiv = document.getElementById("historias-publicadas");
  historiasDiv.innerHTML = '';

  historias.forEach(function(historia) {
      var historiaElement = document.createElement("div");
      var link = `<a href="ver-post.html?id=${historias.indexOf(historia)}">${historia.titulo}</a>`;
      historiaElement.innerHTML = `<h3>${link}</h3><p>${historia.contenido.substring(0, 100)}...</p>`;
      historiasDiv.appendChild(historiaElement);
  });
}

// Cargar las historias al cargar la página
document.addEventListener("DOMContentLoaded", mostrarHistoriasPublicadas);
