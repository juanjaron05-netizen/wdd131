
const destinations = [
  {
    id: "foz",
    name: "Foz do Iguaçu",
    region: "Paraná",
    category: "natureza",
    description:
      "Conheça as Cataratas do Iguaçu, admire as quedas-d'água e explore as paisagens naturais da região.",
    activity: "Visitar as Cataratas do Iguaçu",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
    alt: "Paisagem natural com vegetação e água"
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    region: "Rio de Janeiro",
    category: "praia",
    description:
      "Descubra praias famosas, montanhas e mirantes com vistas marcantes da cidade e do litoral.",
    activity: "Conhecer as praias e os mirantes",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",
    alt: "Vista panorâmica do Rio de Janeiro entre montanhas e mar"
  },
  {
    id: "ouro-preto",
    name: "Ouro Preto",
    region: "Minas Gerais",
    category: "historia",
    description:
      "Explore ruas de pedra, igrejas e construções coloniais que fazem parte do patrimônio histórico brasileiro.",
    activity: "Passear pelo centro histórico",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=900&q=80",
    alt: "Arquitetura histórica e construções tradicionais"
  }
];

const destinationList = document.querySelector("#destination-list");
const resultsMessage = document.querySelector("#results-message");
const filterButtons = document.querySelectorAll(".filter-button");

function renderDestinations(category = "todos") {
  const filteredDestinations = destinations.filter((destination) => {
    if (category === "todos") {
      return true;
    }

    return destination.category === category;
  });

  if (filteredDestinations.length === 0) {
    destinationList.innerHTML = `<p>Nenhum destino encontrado nesta categoria.</p>`;
    resultsMessage.textContent = `Nenhum destino encontrado.`;
    return;
  }

  destinationList.innerHTML = filteredDestinations
    .map(
      (destination) => `
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
          </div>
        </article>
      `
    )
    .join("");

  resultsMessage.textContent =
    `${filteredDestinations.length} destino(s) encontrado(s).`;

  addImageFallbacks();
}

function addImageFallbacks() {
  const images = destinationList.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackUsed === "true") {
        return;
      }

      image.dataset.fallbackUsed = "true";

      image.src =
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80";

      image.alt = "Paisagem natural brasileira";
    }, { once: true });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.classList.toggle("active", isSelected);
      filterButton.setAttribute("aria-pressed", `${isSelected}`);
    });

    renderDestinations(selectedCategory);
  });
});

renderDestinations();

