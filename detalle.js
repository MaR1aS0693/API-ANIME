const detallecontainer = document.getElementById('animeDetails');

// Obtener ID desde la URL
const parametros = new URLSearchParams(window.location.search);
const animeId = parametros.get('id');

const fetchAnimeDetails = (id) => {
    detallecontainer.innerHTML = "<p>Cargando detalles...</p>";

    fetch(`https://api.jikan.moe/v4/anime/${id}`)
    .then(response => response.json())
    .then(data => {
        const anime = data.data;
        renderAnimeDetalle(anime);
    })
    .catch(error => {
        console.error("Error anime detalle:", error);
        detallecontainer.innerHTML = "<p>Error de carga de datos.</p>";
    });
};

const renderAnimeDetalle = (anime) => {
    detallecontainer.innerHTML = `
       <div class="detalle-card">
           <h2>${anime.title}</h2>
           <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="detalle-image">
           <p><strong>Episodios:</strong> ${anime.episodes ?? "Desconocido"}</p>
           <p><strong>Estado:</strong> ${anime.status}</p>
           <p><strong>Sinopsis:</strong> ${anime.synopsis ?? "Sin sinopsis disponible."}</p>
           <p><strong>Géneros:</strong> ${anime.genres.map(g => g.name).join(", ")}</p>
           <p><strong>Puntuación:</strong> ${anime.score ?? "N/A"}</p>
           <button onclick="history.back()">Volver</button>
       </div>`;
};

if (animeId) {
    fetchAnimeDetails(animeId);
} else {
    detallecontainer.innerHTML = "<p>No se especificó ningún anime.</p>";
}