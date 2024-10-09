// Función para obtener parámetros de la URL
function getQueryParam(param) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Cargar la historia completa según el ID
function cargarHistoriaCompleta() {
  var id = getQueryParam("id");
  var historias = JSON.parse(localStorage.getItem('historiasPublicadas')) || [];
  var historia = historias[id];

  if (historia) {
      document.getElementById("post-titulo").textContent = historia.titulo;
      document.getElementById("post-contenido").textContent = historia.contenido;
  } else {
      document.getElementById("post-titulo").textContent = "Historia no encontrada";
      document.getElementById("post-contenido").textContent = "";
  }
}

// Cargar la historia al cargar la página
document.addEventListener("DOMContentLoaded", cargarHistoriaCompleta);
