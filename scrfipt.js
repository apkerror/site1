// MENU PARA CELULAR

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    navigation.classList.toggle("open", !isExpanded);
  });

  // Permite fechar o menu usando a tecla Escape.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
      menuButton.focus();
    }
  });
}


// FILTROS DO CATÁLOGO

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll("[data-category]");
const productCount = document.querySelector("#count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    // Atualiza a aparência e o estado dos botões.
    filterButtons.forEach((otherButton) => {
      otherButton.setAttribute(
        "aria-pressed",
        String(otherButton === button)
      );
    });

    let visibleProducts = 0;

    // Mostra apenas os produtos da categoria selecionada.
    productCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "todos" ||
        card.dataset.category === selectedCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleProducts++;
      }
    });

    // Informa quantos produtos estão visíveis.
    if (productCount) {
      productCount.textContent =
        visibleProducts === 1
          ? "1 produto encontrado"
          : `${visibleProducts} produtos encontrados`;
    }
  });
});


// FORMULÁRIO DEMONSTRATIVO
// Não envia mensagens nem salva dados.

const contactForm = document.querySelector("#contact-form");
const result = document.querySelector("#result");

if (contactForm && result) {
  contactForm.addEventListener("submit", (event) => {
    // Impede o envio e o recarregamento da página.
    event.preventDefault();

    const data = new FormData(contactForm);

    const name = String(data.get("nome") || "").trim();
    const pet = String(data.get("pet") || "").trim();
    const subject = String(data.get("assunto") || "");
    const message = String(data.get("mensagem") || "").trim();

    const preview = [
      `Prévia do contato de ${name}`,
      pet ? `Pet: ${pet}` : "",
      `Assunto: ${subject}`,
      "",
      message,
      "",
      "Esta é uma demonstração. Nenhum dado foi enviado ou " +
        "armazenado e nenhum agendamento foi realizado."
    ];

    // textContent exibe o conteúdo como texto, sem executar HTML.
    result.textContent = preview.join("\n");

    // Direciona o foco para o resultado.
    result.focus();
  });
}