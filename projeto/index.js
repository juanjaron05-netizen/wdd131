
const destinations = [
  {
    id: "foz",
    name: "Foz do Iguaçu",
    region: "Paraná",
    description: "Conheça as Cataratas do Iguaçu e contemple uma das paisagens naturais mais impressionantes do Brasil.",
    activity: "Visitar as cataratas",
    image: "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?auto=format&fit=crop&w=900&q=75",
    alt: "Grande queda-d'água cercada por vegetação"
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    region: "Rio de Janeiro",
    description: "Explore praias famosas, mirantes e paisagens que combinam montanhas, cidade e mar.",
    activity: "Conhecer os mirantes e as praias",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=75",
    alt: "Paisagem do Rio de Janeiro com montanhas e litoral"
  },
  {
    id: "ouro-preto",
    name: "Ouro Preto",
    region: "Minas Gerais",
    description: "Caminhe por ruas históricas, admire a arquitetura colonial e conheça o patrimônio cultural da cidade.",
    activity: "Explorar o centro histórico",
    image: "https://images.unsplash.com/photo-1598689091637-c4a4a5f06a2e?auto=format&fit=crop&w=900&q=75",
    alt: "Arquitetura histórica em uma cidade brasileira"
  }
];

const storageKey = `descubraBrasilFavoritos`;
const destinationList = document.querySelector(`#destination-list`);
const favoritesSummary = document.querySelector(`#favorites-summary`);

function loadFavorites() {
  try {
    const savedFavorites = JSON.parse(
      localStorage.getItem(storageKey) ?? `[]`
    );

    if (Array.isArray(savedFavorites)) {
      return savedFavorites.filter((id) =>
        destinations.some((destination) => destination.id === id)
      );
    }

    return [];
  } catch (error) {
    return [];
  }
}

let favoriteIds = loadFavorites();

function saveFavorites() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    return true;
  } catch (error) {
    return false;
  }
}

function updateFavoritesSummary() {
  const total = favoriteIds.length;

  if (total === 0) {
    favoritesSummary.textContent =
      `Você ainda não salvou nenhum destino.`;
  } else if (total === 1) {
    favoritesSummary.textContent =
      `Você salvou 1 destino como favorito.`;
  } else {
    favoritesSummary.textContent =
      `Você salvou ${total} destinos como favoritos.`;
  }
}

function renderDestinations() {
  const destinationCards = destinations.map((destination) => {
    const isFavorite = favoriteIds.includes(destination.id);

    return `
      <article class="destination-card">
        <img
          src="${destination.image}"
          alt="${destination.alt}"
          loading="lazy"
          width="900"
          height="600"
        >

        <div class="destination-card-content">
          <p class="destination-region">${destination.region}</p>
          <h3>${destination.name}</h3>
          <p>${destination.description}</p>
          <p><strong>Sugestão:</strong> ${destination.activity}</p>

          <button
            class="favorite-button"
            type="button"
            data-id="${destination.id}"
            aria-pressed="${isFavorite}"
          >
            ${isFavorite ? `Remover dos favoritos` : `Salvar nos favoritos`}
          </button>
        </div>
      </article>
    `;
  });

  destinationList.innerHTML = destinationCards.join(``);
  updateFavoritesSummary();
}

destinationList.addEventListener(`click`, (event) => {
  const button = event.target.closest(`.favorite-button`);

  if (!button) {
    return;
  }

  const destinationId = button.dataset.id;

  if (favoriteIds.includes(destinationId)) {
    favoriteIds = favoriteIds.filter((id) => id !== destinationId);
  } else {
    favoriteIds = [...favoriteIds, destinationId];
  }

  const wasSaved = saveFavorites();

  renderDestinations();

  if (!wasSaved) {
    favoritesSummary.textContent =
      `Seus favoritos foram atualizados nesta página, mas o navegador não permitiu salvá-los.`;
  }
});

renderDestinations();
