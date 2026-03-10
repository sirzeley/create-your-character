/* ==================================================
   SETOR 1 — BASE DE DADOS (RAÇAS E CLASSES)
   - Estrutura central para preencher as gavetas
   - Mantida fiel ao original
================================================== */
const dadosFicha = {
  racas: {
    Humano: ["Padrão", "Variante", "Sentinela", "Meio-Elfo", "Tiefling", "Aasimar"],
    Elfo: ["Alto Elfo", "Elfo da Floresta", "Elfo Negro (Drow)", "Eladrin", "Shadar-Kai", "Elfo marinho", "Elfo astral", "Avariel"],
    Anão: ["Anão da Colina", "Anão da Montanha", "Duegar", "Anão Guardião Marcado"],
    Halfling: ["Pés-Leves", "Robusto", "Espírito Sábio", "Curandeiro"],
    Draconato: ["Cromático", "Metálico", "Pedras Preciosas", "Antigo"],
    Gnomo: ["Gnomo da Floresta", "Gnomo de Pedra", "Gnomo das Profundezas", "Marca da Escrita"],
    Bestial: ["Tabaxi", "Leonino", "Loxodon", "Minotauro", "Centauro", "Sátiro", "Tartaruga", "Kenku", "Aarakocra", "Harengon", "Povo Lagarto", "Grung", "Locathah", "Thri-Kreen", "Hadozee", "Híbrido"],
    Monstro: ["Goblin", "Duende", "Súcubo", "Tritão", "Lobisomem", "Vampiro", "Zumbi", "Espectro", "Fantasma", "Lich", "Demônio", "Orc", "Meio-Orc", "Pesadelo", "Kobold", "Giff"],
    Psiquico: ["Githyanki", "Githzerai", "Kalashtar"],
    Construto: ["Warforged", "Autômato", "Híbrido", "Plasmoide"],
    Místico: ["Tiefling", "Aasimar", "Genasi", "Metamorfo", "Transmorfo", "Fada", "Verdan"]
  },

  classes: {
    Guerreiro: ["Bárbaro", "Cavaleiro", "Samurai", "Espadachim", "Cavalariço", "Gladiador", "Senhor da Guerra", "Guerreiro da Lâmina", "Sohei", "Duelista", "Kensai", "Mestre de Batalha", "Batedor", "Mago da Espada", "Cavaleiro Arcano", "Lâmina Amaldiçoada", "Lamina do Crepúsculo"],
    Mago: ["Wu Jen", "Mago de Guerra", "Conjurador das Sombras", "Mago Vermelho", "Cantor de Lâminas", "Cronomante", "Elementalista", "Mago Espadachim", "Teurgo Místico", "Cavaleiro Arcano"],
    Ladino: ["Assassino", "Ninja", "Escoteiro", "Factótum", "Sedutor", "Dançarino das Sombras", "Malandro Arcano", "Aventureiro"],
    Clérigo: ["Alma Favorecida", "Templário", "Invocador", "Arquivista", "Teurgo Místico", "Oráculo"],
    Guardião: ["Mestre das Feras", "Caminhante do Horizonte", "Escoteiro", "Buscador", "Diretor", "Espírito Xamânico"],
    Bardo: ["Skald", "Bobo da Corte", "Factotum", "Marechal"],
    Feiticeiro: ["Feiticeiro Dracônico", "Portador do Fogo Mágico", "Mago Selvagem", "Necromante Temível"],
    Bruxo: ["Fichário", "Lâmina Hexagonal", "Fichário do Demônio", "Bruxo das Sombras", "Bruxa"],
    Monge: ["Ninja de Ki", "Kensai", "Monge Psionico", "Sohei"],
    Paladino: ["Guarda Negro", "Vingador", "Cruzado", "Cavaleiro de Solamnia", "Cavalier", "Juiz"],
    Druida: ["Buscador", "Diretor", "Espírito Xamânico", "Xamã", "Bruxa da Natureza", "Adepto Elemental"],
    Artificeiro: ["Artesão", "Mago Artesão", "Inventor", "Sacerdote das Runas", "Mecanista"],
    Místico: ["Psionico", "Ardente", "Mente de Batalha", "Lâmina da Alma", "Selvagem", "Guerreiro Psiquico"]
  }
};


/* ==================================================
   SETOR 2 — SELECTS (RAÇA / SUB-RAÇA / CLASSE / SUB-CLASSE)
================================================== */

/** Preenche um <select> com opções */
function preencherSelect(id, opcoes) {
  const select = document.getElementById(id);
  if (!select) return;

  select.innerHTML = "";
  opcoes.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });
}

/** Inicializa selects principais e seus valores iniciais */
function inicializarSelects() {
  preencherSelect("raca", Object.keys(dadosFicha.racas));
  preencherSelect("classe", Object.keys(dadosFicha.classes));

  const racaInicial = Object.keys(dadosFicha.racas)[0];
  const classeInicial = Object.keys(dadosFicha.classes)[0];

  preencherSelect("subraca", dadosFicha.racas[racaInicial]);
  preencherSelect("subclasse", dadosFicha.classes[classeInicial]);
}


/* ==================================================
   SETOR 3 — GAVETAS (ABRIR / FECHAR + SONS)
================================================== */

function inicializarGavetas() {
  const gavetas = document.querySelectorAll(".gaveta");

  gavetas.forEach(gaveta => {
    const fechada = gaveta.querySelector(".gaveta-fechada");
    const aberta = gaveta.querySelector(".gaveta-aberta");
    const select = aberta.querySelector("select");

    const somAbre = document.getElementById("folha-abre");
    const somFecha = document.getElementById("folha-fecha");

    // Estado inicial
    fechada.style.display = "flex";
    aberta.style.display = "none";

    // Abrir gaveta
    fechada.addEventListener("click", () => {
      somAbre.currentTime = 0;
      somAbre.play();

      fechada.style.display = "none";
      aberta.style.display = "flex";
    });

    // Fechar gaveta
    aberta.addEventListener("click", () => {
      somFecha.currentTime = 0;
      somFecha.play();

      aberta.style.display = "none";
      fechada.style.display = "flex";
    });

    // Evita fechar ao clicar no select
    if (select) {
      select.addEventListener("click", e => e.stopPropagation());
      select.addEventListener("change", atualizarImagem);
    }
  });
}


/* ==================================================
   SETOR 4 — ATRIBUTOS (FORÇA, DESTREZA, ETC.)
================================================== */

let pontosRestantes = 27;

/** Atualiza o contador visual de pontos restantes */
function atualizarPontos() {
  document.getElementById("valor-pontos-restantes").textContent = pontosRestantes;
}

/** Configura um bloco de atributo (botões + e -) */
function configurarAtributo(bloco) {
  const btnMenos = bloco.querySelector(".btn-menos");
  const btnMais = bloco.querySelector(".btn-mais");
  const spanValor = bloco.querySelector(".valor-atributo");

  const somMais = document.getElementById("som-mais");
  const somMenos = document.getElementById("som-menos");

  let valor = 0;
  spanValor.textContent = valor;

  btnMais.addEventListener("click", () => {
    if (pontosRestantes <= 0) return;

    somMais.currentTime = 0;
    somMais.play();

    valor++;
    spanValor.textContent = valor;
    pontosRestantes--;
    atualizarPontos();
    atualizarImagem();
  });

  btnMenos.addEventListener("click", () => {
    if (valor <= 0) return;

    somMenos.currentTime = 0;
    somMenos.play();

    valor--;
    spanValor.textContent = valor;
    pontosRestantes++;
    atualizarPontos();
    atualizarImagem();
  });
}

/** Inicializa todos os atributos */
function inicializarAtributos() {
  document.querySelectorAll(".atributo").forEach(configurarAtributo);
  atualizarPontos();
}


/* ==================================================
   SETOR 5 — CAPTURA DA FICHA (OBJETO FINAL)
================================================== */

function capturarFicha() {
  const getValor = id =>
    parseInt(document.querySelector(`#${id} .valor-atributo`)?.textContent) || 0;

  return {
    nome: document.getElementById("nome").value.trim(),
    antecedente: document.getElementById("antecedente").value.trim(),
    raca: document.getElementById("raca").value,
    subraca: document.getElementById("subraca").value,
    classe: document.getElementById("classe").value,
    subclasse: document.getElementById("subclasse").value,
    extras: document.getElementById("extras").value.trim(),
    ferramentas: document.getElementById("ferramentas").value.trim(),
    atributos: {
      forca: getValor("forca"),
      destreza: getValor("destreza"),
      constituicao: getValor("constituicao"),
      inteligencia: getValor("inteligencia"),
      sabedoria: getValor("sabedoria"),
      carisma: getValor("carisma")
    }
  };
}


/* ==================================================
   SETOR 6 — GERAR CARD VISUAL
================================================== */

function gerarCard() {
  const f = capturarFicha();

  document.getElementById("card-personagem").innerHTML = `
    <div class="card">
      <h2>${f.nome || "Personagem sem nome"}</h2>
      <h3>${f.raca} ${f.subraca}</h3>
      <h3>${f.classe} ${f.subclasse ? "- " + f.subclasse : ""}</h3>

      <p><strong>Antecedente:</strong> ${f.antecedente || "—"}</p>

      <p><strong>Atributos:</strong></p>
      <ul>
        <li>Força: ${f.atributos.forca}</li>
        <li>Destreza: ${f.atributos.destreza}</li>
        <li>Constituição: ${f.atributos.constituicao}</li>
        <li>Inteligência: ${f.atributos.inteligencia}</li>
        <li>Sabedoria: ${f.atributos.sabedoria}</li>
        <li>Carisma: ${f.atributos.carisma}</li>
      </ul>

      <p><strong>Extras:</strong> ${f.extras || "—"}</p>
      <p><strong>Ferramentas:</strong> ${f.ferramentas || "—"}</p>
    </div>
  `;
}


/* ==================================================
   SETOR 7 — PROMPT PROCEDURAL PARA IA
================================================== */

function gerarPromptProcedural() {
  const f = capturarFicha();

  let p = `Crie uma imagem de um personagem de RPG. Raça: ${f.raca}. Sub-raça: ${f.subraca}. Classe: ${f.classe}. Sub-classe: ${f.subclasse}.`;

  if (f.atributos.forca >= 10) p += " Corpo forte e imponente.";
  if (f.atributos.destreza >= 10) p += " Postura ágil e equilibrada.";
  if (f.atributos.inteligencia >= 10) p += " Olhar inteligente e atento.";

  p += " Estilo fantasia medieval, detalhes realistas, iluminação dramática.";

  return p;
}


/* ==================================================
   SETOR 8 — INTEGRAÇÃO COM BACKEND DE IA
================================================== */

async function gerarImagemIA(prompt) {
  try {
    const resposta = await fetch("http://localhost:3000/gerar-imagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!resposta.ok) return null;

    const dados = await resposta.json();
    return dados.imagem;
  } catch {
    return null;
  }
}

async function atualizarImagem() {
  const img = document.getElementById("imagem-personagem");
  if (!img) return;

  img.src = "";
  img.alt = "Gerando imagem...";

  const base64 = await gerarImagemIA(gerarPromptProcedural());

  if (!base64) {
    img.alt = "Erro ao gerar imagem.";
    return;
  }

  img.src = "data:image/png;base64," + base64;
  img.alt = "Imagem gerada.";
}


/* ==================================================
   SETOR 9 — EVENTOS PRINCIPAIS
================================================== */

function inicializarEventosSelects() {
  document.getElementById("raca").addEventListener("change", e => {
    preencherSelect("subraca", dadosFicha.racas[e.target.value]);
    atualizarImagem();
  });

  document.getElementById("classe").addEventListener("change", e => {
    preencherSelect("subclasse", dadosFicha.classes[e.target.value]);
    atualizarImagem();
  });
}

function inicializarBotaoCard() {
  const btn = document.getElementById("btn-gerar-card");
  const somGerar = document.getElementById("som-gerar-card");

  btn.addEventListener("click", () => {
    somGerar.currentTime = 0;
    somGerar.play();
    gerarCard();
  });
}


/* ==================================================
   SETOR 10 — BOTÃO DE MUTE
================================================== */

function inicializarMute() {
  const btnMute = document.getElementById("btn-mute");
  const audios = document.querySelectorAll("audio");

  let mutado = false;

  btnMute.addEventListener("click", () => {
    mutado = !mutado;

    audios.forEach(a => a.muted = mutado);

    btnMute.classList.toggle("mutado", mutado);
  });
}


/* ==================================================
   SETOR 11 — INICIALIZAÇÃO GERAL
================================================== */

window.addEventListener("DOMContentLoaded", () => {
  inicializarSelects();
  inicializarGavetas();
  inicializarAtributos();
  inicializarEventosSelects();
  inicializarBotaoCard();
  inicializarMute();

  // Volume inicial da música
  const musica = document.getElementById("musica-taberna");
  if (musica) musica.volume = 0.25;
});

/* Música toca após o primeiro clique */
window.addEventListener("click", () => {
  const audio = document.getElementById("musica-taberna");
  if (audio) audio.play().catch(() => {});
}, { once: true });
