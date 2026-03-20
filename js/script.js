/**
 * =========================================================
 * Projeto: Gerador de Box Shadow
 * Descrição: Classe responsável por gerenciar os valores,
 * aplicar o efeito visual e gerar o código CSS dinamicamente
 * =========================================================
 */
class BoxShadowGenerator {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
  ) {
    // Inputs principais (range)
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.blur = blur;
    this.spread = spread;
    this.color = color;
    this.opacity = opacity;
    this.inset = inset;

    // Inputs auxiliares (texto exibido ao lado)
    this.horizontalRef = horizontalRef;
    this.verticalRef = verticalRef;
    this.blurRef = blurRef;
    this.spreadRef = spreadRef;
    this.colorRef = colorRef;
    this.opacityRef = opacityRef;

    // Estado da sombra (inset ou padrão)
    this.insetRef = inset.checked;

    // Elementos de visualização e saída
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  /**
   * Inicializa os valores da interface e aplica a primeira renderização
   */
  initialize() {
    // Sincroniza os inputs com seus valores iniciais
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.spreadRef.value = this.spread.value;
    this.colorRef.value = this.color.value;
    this.opacityRef.value = this.opacity.value;

    // Aplica efeito inicial
    this.applyRule();
    this.showRule();
  }

  /**
   * Atualiza valores com base na interação do usuário
   * @param {string} type - Tipo do controle alterado
   * @param {string|boolean} value - Novo valor do input
   */
  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
      case "opacity":
        this.opacityRef.value = value;
        break;
      case "inset":
        this.insetRef = value;
        break;
    }

    // Reaplica a regra sempre que houver mudança
    this.applyRule();
    this.showRule();
  }

  /**
   * Gera a string do box-shadow e aplica no preview
   */
  applyRule() {
    // Converte cor HEX para RGB
    const rgbValue = this.hexToRgb(this.colorRef.value);

    // Monta a regra dinâmica do box-shadow
    const shadowRule = `${this.insetRef ? "inset" : ""} ${
      this.horizontalRef.value
    }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
      this.spreadRef.value
    }px rgba(${rgbValue}, ${this.opacityRef.value})`;

    // Aplica no elemento visual
    this.previewBox.style.boxShadow = shadowRule;

    // Armazena regra atual para reutilização
    this.currentRule = shadowRule;
  }

  /**
   * Exibe a regra gerada na tela (incluindo compatibilidade)
   */
  showRule() {
    const ruleWithSemiColon = `${this.currentRule};`;

    this.rule.innerText = ruleWithSemiColon;
    this.webkitRule.innerText = ruleWithSemiColon;
    this.mozRule.innerText = ruleWithSemiColon;
  }

  /**
   * Converte cor HEX para RGB
   * @param {string} hex - Cor no formato hexadecimal (#000000)
   * @returns {string} RGB formatado (ex: "0, 0, 0")
   */
  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

/* ============================
   SELEÇÃO DE ELEMENTOS
============================ */

const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");

const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");

const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");

const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const previewBox = document.querySelector("#box");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");

const inset = document.querySelector("#inset");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

/* ============================
   INSTÂNCIA DA CLASSE
============================ */

const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur,
  blurRef,
  spread,
  spreadRef,
  color,
  colorRef,
  opacity,
  opacityRef,
  inset,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

// Inicializa aplicação
boxShadow.initialize();

/* ============================
   EVENTOS (INTERAÇÃO DO USUÁRIO)
============================ */

// Atualização dinâmica dos controles
horizontal.addEventListener("input", (e) => {
  boxShadow.updateValue("horizontal", e.target.value);
});

vertical.addEventListener("input", (e) => {
  boxShadow.updateValue("vertical", e.target.value);
});

blur.addEventListener("input", (e) => {
  boxShadow.updateValue("blur", e.target.value);
});

spread.addEventListener("input", (e) => {
  boxShadow.updateValue("spread", e.target.value);
});

color.addEventListener("input", (e) => {
  boxShadow.updateValue("color", e.target.value);
});

opacity.addEventListener("input", (e) => {
  boxShadow.updateValue("opacity", e.target.value);
});

inset.addEventListener("input", (e) => {
  boxShadow.updateValue("inset", e.target.checked);
});

/* ============================
   FUNCIONALIDADE: COPIAR CSS
============================ */

const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

// Copia as regras geradas para a área de transferência
rulesArea.addEventListener("click", () => {
  // Remove quebras de linha desnecessárias
  const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

  navigator.clipboard.writeText(rules).then(() => {
    // Feedback visual para o usuário
    copyInstructions.innerText = "Regra copiada com sucesso!";

    // Retorna mensagem original após 1 segundo
    setTimeout(() => {
      copyInstructions.innerText =
        "Clique no quadro acima para copiar as regras";
    }, 1000);
  });
});