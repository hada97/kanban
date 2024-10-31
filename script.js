function addCardEvents(card) {
  // Evento disparado quando começa a arrastar um card
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });

  // Evento disparado quando termina de arrastar o card
  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });

  // Adiciona evento ao botão de edição
  card.querySelector(".edit-card").addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o evento de arrastar seja acionado
    const newTitle = prompt(
      "Digite o novo título da tarefa:",
      card.querySelector(".card-title").textContent
    );
    if (newTitle) {
      card.querySelector(".card-title").textContent = newTitle;
    }
  });

  // Adiciona evento ao botão de exclusão
  card.querySelector(".delete-card").addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o evento de arrastar seja acionado
    const confirmation = confirm("Tem certeza que deseja excluir este cartão?");
    if (confirmation) {
      card.remove(); // Remove o cartão do DOM
    }
  });

  // Adiciona evento ao select de prioridade
  card.querySelector("select").addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    const colors = {
      low: "#92a5fb", // Baixa prioridade
      medium: "#fea065", // Média prioridade
      high: "#d573b6", // Alta prioridade
    };
    card.style.backgroundColor = colors[selectedValue];
  });
}

// Inicializa os eventos para todos os cards existentes
document.querySelectorAll(".kanban-card").forEach((card) => {
  addCardEvents(card);
});

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll(".kanban-cards").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("cards-hover");
  });

  column.addEventListener("dragleave", (e) => {
    e.currentTarget.classList.remove("cards-hover");
  });

  column.addEventListener("drop", (e) => {
    e.currentTarget.classList.remove("cards-hover");
    const dragCard = document.querySelector(".kanban-card.dragging");
    e.currentTarget.appendChild(dragCard);
  });
});

// Adiciona o evento para criar novos cartões
document.querySelectorAll(".add-card").forEach((button) => {
  button.addEventListener("click", function () {
    const column = this.closest(".kanban-column");

    const newCard = document.createElement("div");
    newCard.classList.add("kanban-card");
    newCard.draggable = true;

    newCard.innerHTML = `
              <select>
                <option value="low">Baixa prioridade</option>
                <option value="medium">Média prioridade</option>
                <option value="high">Alta prioridade</option>
              </select>
              <input
                type="text"
                class="card-title"
                maxlength="20"
                placeholder="Digite o título"
              />
              <div class="card-infos">
                <div class="card-icons">
                  <p><i class="fa-regular fa-comment"></i></p>
                  <p><i class="fa-solid fa-paperclip"></i></p>
                  <button class="edit-card" aria-label="Editar cartão">
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button class="delete-card" aria-label="Excluir cartão">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>

                <div class="user">
                  <img
                    src="av.jpg"
                    alt="Avatar"
                    class="avatar"
                    onclick="changeAvatars(this)"
                  />
                </div>
              </div>
        `;

    const cardsContainer = column.querySelector(".kanban-cards");
    cardsContainer.appendChild(newCard);

    // Adiciona eventos ao novo card
    addCardEvents(newCard);
  });
});

function loadAvatar(event, inputElement) {
  const avatarImage = inputElement.parentElement.querySelector(".avatar");
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function changeAvatars() {
  const newUrl = prompt("Digite a URL da nova imagem:");
  if (newUrl) {
    const avatars = document.querySelectorAll(".avatar");
    avatars.forEach((avatar) => {
      avatar.src = newUrl;
    });
  }
}

// Adiciona evento ao botão de exclusão
card.querySelector(".delete-card").addEventListener("click", (e) => {
  e.stopPropagation(); // Impede que o evento de arrastar seja acionado
  const confirmation = confirm("Tem certeza que deseja excluir este cartão?");
  if (confirmation) {
    card.remove(); // Remove o cartão do DOM
  }
});
