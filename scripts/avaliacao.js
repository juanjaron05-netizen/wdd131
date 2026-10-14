
let contador = Number.parseInt(
    localStorage.getItem("avaliacoesConcluidas") || "0",
    10
);

contador += 1;

localStorage.setItem("avaliacoesConcluidas", String(contador));

const elementoContador = document.querySelector("#review-count");

if (elementoContador) {
    elementoContador.textContent = String(contador);
}

const ultimaModificacao = document.querySelector("#last-modified");

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}
