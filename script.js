function addCardEvents(card) {
  // Eventos para drag and drop
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });

  // Evento para adicionar comentários
  card.querySelector(".comment").addEventListener("click", (e) => {
    e.stopPropagation();
    const comment = prompt("Digite seu comentário:");
    const commentCountSpan = card.querySelector(".comment-count");
    if (comment) {
      const commentsDiv = card.querySelector(".comments");
      const newComment = document.createElement("p");
      newComment.textContent = comment;
      commentsDiv.appendChild(newComment);
      let count = parseInt(commentCountSpan.textContent) || 0;
      count += 1;
      commentCountSpan.textContent = count;
      commentCountSpan.style.display = "inline";
    }
  });

  const clipButton = card.querySelector(".clip");
  const fileInput = clipButton.querySelector(".file-input");

  clipButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o evento de arrastar seja acionado
    fileInput.click(); // Simula o clique no input de arquivo
  });

  // Adiciona o evento para o input de arquivo
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Exibe o nome do primeiro arquivo anexado
      const fileName = document.createElement("p");
      fileName.textContent = `Anexo: ${files[0].name}`;
      card.querySelector(".attachments").appendChild(fileName); // Adiciona o nome à seção de anexos
    }
  });

  card.querySelector(".edit-card").addEventListener("click", (e) => {
    e.stopPropagation();

    // Altera o estado de exibição da seção de comentários
    const commentsDiv = card.querySelector(".comments");
    if (
      commentsDiv.style.display === "none" ||
      commentsDiv.style.display === ""
    ) {
      commentsDiv.style.display = "block"; // Mostra os comentários
    } else {
      commentsDiv.style.display = "none"; // Esconde os comentários
    }
  });

  // Evento para excluir o cartão
  card.querySelector(".delete-card").addEventListener("click", (e) => {
    e.stopPropagation();
    const confirmation = confirm("Tem certeza que deseja excluir este cartão?");
    if (confirmation) {
      card.remove();
    }
  });

  // Evento para mudança de prioridade com botão
  const priorityButton = card.querySelector(".priority");
  priorityButton.addEventListener("click", (event) => {
    const currentPriority = event.target.dataset.priority;

    // Mapeia as prioridades e suas respectivas cores de fundo
    const priorities = {
      low: { text: "Média prioridade", color: "#fea065", next: "medium" },
      medium: { text: "Alta prioridade", color: "#d573b6", next: "high" },
      high: { text: "Baixa prioridade", color: "#92a5fb", next: "low" },
    };

    const newPriority = priorities[currentPriority];
    priorityButton.textContent = newPriority.text; // Atualiza o texto do botão
    priorityButton.dataset.priority = newPriority.next; // Atualiza a prioridade no dataset
    card.style.backgroundColor = newPriority.color; // Altera a cor de fundo do cartão
  });
}

// Inicializa os eventos para todos os cards existentes
document.querySelectorAll(".kanban-card").forEach((card) => {
  addCardEvents(card);
});

// Adiciona eventos às colunas
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

      <button class="priority" data-priority="low">
      Baixa prioridade
      </button>
      <input type="text" class="card-title" maxlength="30" placeholder="Digite o título" />
      <div class="comments"></div>
      <div class="card-infos">
        <div class="card-icons">
          <button class="comment">
            <i class="fa-regular fa-comment"></i>
            <span class="comment-count" style="display: none">0</span>
          </button>
          <button class="clip">
            <i class="fa-solid fa-paperclip"></i>
            <input type="file" class="file-input" style="display: none;" />
            <span class="file-count" style="display: none;">0</span>
          </button>
          <button class="edit-card" aria-label="Editar cartão">
            <i class="fa-solid fa-arrows-alt"></i>
          </button>
          <button class="delete-card" aria-label="Excluir cartão">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="user">
          <img src="av.jpg" alt="Avatar" class="avatar" onclick="changeAvatars(this)" />
        </div>
      </div>`;

    const cardsContainer = column.querySelector(".kanban-cards");
    cardsContainer.appendChild(newCard);
    addCardEvents(newCard); // Adiciona eventos ao novo card
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
