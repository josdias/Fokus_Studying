const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBr = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const imagemPlayPause = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("sons/play.wav");
const musicaPause = new Audio("sons/pause.mp3");
const musicaFim = new Audio("sons/beep.mp3");

let tempoEmSegundos = 3;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoEmSegundos = 3;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;

    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!<strong>
        `;
      break;

    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar à superfíce.
        <strong class="app__title-strong">Faça uma pausa longa.<strong>
        `;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoEmSegundos <= 0) {
    musicaFim.play();
    alert("Tempo Finalizado");
    zerar();
    return;
  }
  tempoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBr.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    musicaPause.play();
    imagemPlayPause.setAttribute("src", "imagens/play_arrow.png");
    zerar();
    return;
  }
  musicaPlay.play();
  imagemPlayPause.setAttribute("src", "imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
