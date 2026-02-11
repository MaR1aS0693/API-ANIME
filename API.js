const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

let allAnime = [];

const fetchAnime = (query) => {
  resultsDiv.innerHTML = "<p>Buscando...</p>";

  fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`)
    .then(response => response.json())
    .then(data => {
      allAnime = data.data;
      renderAnime(allAnime);
    })
    .catch(error => {
      console.error("Error fetching anime:", error);
      resultsDiv.innerHTML = "<p>Error de carga de datos.</p>";
    });
};

const renderAnime = (animes) => {
  resultsDiv.innerHTML = "";

  if (animes.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  animes.forEach(anime => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('card');

    itemDiv.addEventListener('click', () => {
      window.location.href = `detalle.html?id=${anime.mal_id}`;
    });

    itemDiv.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p><strong>Puntuación:</strong> ${anime.score ?? 'N/A'}</p>
    `;

    resultsDiv.appendChild(itemDiv);
  });
};

searchBtn.addEventListener("click", () => {
  const searchText = searchInput.value.trim();
  if (searchText) {
    fetchAnime(searchText);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchAnime(searchInput.value.trim());
  }
});