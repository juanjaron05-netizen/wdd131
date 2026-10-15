const travelForm = document.querySelector("#travel-form");
const travelResult = document.querySelector("#travel-result");

const destinationPlans = {
  "Foz do Iguaçu": {
    category: "Natureza e aventura",
    activities: [
      "Visite as Cataratas do Iguaçu e reserve tempo para apreciar as paisagens.",
      "Explore o Parque das Aves e conheça espécies da fauna brasileira.",
      "Conheça o Marco das Três Fronteiras e aproveite o fim da tarde."
    ],
    tip: "Confira os ingressos, os horários e as condições de visita das atrações antes de sair."
  },

  "Rio de Janeiro": {
    category: "Praias e cultura",
    activities: [
      "Conheça uma praia famosa, como Copacabana ou Ipanema.",
      "Reserve o dia para visitar o Cristo Redentor ou o Pão de Açúcar.",
      "Explore um ponto cultural da cidade e aproveite a gastronomia local."
    ],
    tip: "Considere o tempo de deslocamento entre as atrações e escolha passeios com antecedência."
  },

  "Ouro Preto": {
    category: "História e cultura",
    activities: [
      "Caminhe pelo centro histórico e observe a arquitetura colonial.",
      "Visite igrejas, museus ou outros espaços históricos abertos ao público.",
      "Explore as ruas tradicionais e conheça a gastronomia mineira."
    ],
    tip: "Use calçados confortáveis: muitas ruas históricas são íngremes e possuem calçamento de pedra."
  },

  "Outro destino brasileiro": {
    category: "Experiências locais",
    activities: [
      "Conheça os principais pontos turísticos do destino escolhido.",
      "Explore uma atração cultural, histórica ou natural da região.",
      "Experimente a gastronomia local e reserve tempo para um passeio livre."
    ],
    tip: "Pesquise as atrações oficiais, os horários, o transporte e as condições climáticas do destino."
  }
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function getBudgetBreakdown(budget) {
  return [
    {
      category: "Hospedagem",
      percentage: 30,
      amount: budget * 0.30
    },
    {
      category: "Alimentação",
      percentage: 25,
      amount: budget * 0.25
    },
    {
      category: "Transporte",
      percentage: 20,
      amount: budget * 0.20
    },
    {
      category: "Passeios e atrações",
      percentage: 25,
      amount: budget * 0.25
    }
  ];
}

function formatCurrency(amount) {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function createItinerary(destination, days, style) {
  const plan = destinationPlans[destination];

  let itinerary = "";

  for (let day = 1; day <= days; day++) {
    const activityIndex = (day - 1) % plan.activities.length;
    const activity = plan.activities[activityIndex];

    let extraTip = "";

    if (day === 1) {
      extraTip = " Organize sua chegada e confirme sua hospedagem.";
    } else if (day === days) {
      extraTip = " Reserve tempo para organizar a bagagem e retornar.";
    }

    if (style === "Natureza e aventura") {
      extraTip += " Priorize atividades ao ar livre e confira a previsão do tempo.";
    } else if (style === "Praias e descanso") {
      extraTip += " Reserve pausas para descansar e aproveite o destino sem pressa.";
    } else if (style === "História e cultura") {
      extraTip += " Procure informações sobre a história e a cultura local.";
    }

    itinerary += `
      <article class="destination-card">
        <div class="destination-card-content">
          <h4>Dia ${day}</h4>
          <p>${escapeHTML(activity)}</p>
          <p>${escapeHTML(extraTip.trim())}</p>
        </div>
      </article>
    `;
  }

  return itinerary;
}

function createBudgetHTML(budget) {
  const categories = getBudgetBreakdown(budget);

  return categories.map((item) => `
    <li>
      <strong>${escapeHTML(item.category)}:</strong>
      ${formatCurrency(item.amount)}
      (${item.percentage}%)
    </li>
  `).join("");
}

function createTravelPlan(travelPlan) {
  const plan = destinationPlans[travelPlan.destination];

  const budgetHTML = createBudgetHTML(travelPlan.budget);
  const itineraryHTML = createItinerary(
    travelPlan.destination,
    travelPlan.days,
    travelPlan.style
  );

  travelResult.innerHTML = `
    <section class="section">
      <h2>Seu roteiro personalizado</h2>

      <p>
        Olá, ${escapeHTML(travelPlan.name)}!
        Preparamos uma sugestão de viagem para você.
      </p>

      <article class="destination-card">
        <div class="destination-card-content">
          <h3>${escapeHTML(travelPlan.destination)}</h3>

          <p>
            <strong>Duração:</strong>
            ${travelPlan.days} dia(s)
          </p>

          <p>
            <strong>Estilo:</strong>
            ${escapeHTML(travelPlan.style)}
          </p>

          <p>
            <strong>Perfil do destino:</strong>
            ${escapeHTML(plan.category)}
          </p>

          <p>
            <strong>Orçamento total informado:</strong>
            ${formatCurrency(travelPlan.budget)}
          </p>
        </div>
      </article>

      <h3>Seu roteiro dia a dia</h3>

      <div class="destination-grid">
        ${itineraryHTML}
      </div>

      <h3>Como distribuir seu orçamento</h3>

      <p>
        Esta é uma estimativa inicial de distribuição do dinheiro,
        não uma cotação de preços reais.
      </p>

      <ul>
        ${budgetHTML}
      </ul>

      <h3>Dica para sua viagem</h3>

      <p>${escapeHTML(plan.tip)}</p>

      <h3>Antes de partir</h3>

      <ul>
        <li>Pesquise os preços atualizados das atrações.</li>
        <li>Confirme hospedagem e transporte.</li>
        <li>Confira a previsão do tempo e os horários de funcionamento.</li>
        <li>Guarde uma reserva para despesas inesperadas.</li>
      </ul>

      <p>
        <strong>Importante:</strong>
        adapte as atividades ao seu orçamento, aos horários
        disponíveis e às condições locais.
      </p>

      <button type="button" id="clear-plan">
        Limpar meu plano
      </button>
    </section>
  `;

  document.querySelector("#clear-plan").addEventListener("click", () => {
    localStorage.removeItem("descubraBrasilPlano");
    travelResult.innerHTML = "";
    travelForm.reset();
  });
}

travelForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#traveler-name").value.trim();
  const destination = document.querySelector("#destination").value;
  const days = Number(document.querySelector("#days").value);
  const budget = Number(document.querySelector("#budget").value);
  const style = document.querySelector("#travel-style").value;

  if (
    !name ||
    !destinationPlans[destination] ||
    !Number.isInteger(days) ||
    days < 1 ||
    days > 60 ||
    !Number.isFinite(budget) ||
    budget < 0 ||
    !style
  ) {
    travelResult.innerHTML = `
      <p>Confira os campos. Informe de 1 a 60 dias e um orçamento válido.</p>
    `;
    return;
  }

  const travelPlan = {
    name,
    destination,
    days,
    budget,
    style
  };

  localStorage.setItem(
    "descubraBrasilPlano",
    JSON.stringify(travelPlan)
  );

  createTravelPlan(travelPlan);
});
