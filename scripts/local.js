const temperatura = 8;
const velocidadeVento = 12;

function calcularSensacaoTermica(temperatura, velocidadeVento) {
    return 13.12 + 0.6215 * temperatura - 11.37 * Math.pow(velocidadeVento, 0.16) + 0.3965 * temperatura * Math.pow(velocidadeVento, 0.16);
}

document.querySelector("#temperatura").textContent = temperatura;
document.querySelector("#vento").textContent = velocidadeVento;

let sensacaoTermica = "N/A";

if (temperatura <= 10 && velocidadeVento > 4.8) {
    sensacaoTermica = calcularSensacaoTermica(
        temperatura,
        velocidadeVento
    ).toFixed(1) + " °C";
}

document.querySelector("#sensacao").textContent = sensacaoTermica;

document.querySelector("#anoAtual").textContent =
    new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
    `Última modificação: ${document.lastModified}`;