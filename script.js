function addCardEvents(card) {
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });

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

  card.querySelector(".edit-card").addEventListener("click", (e) => {
    e.stopPropagation();
    const newTitle = prompt(
      "Digite o novo título da tarefa:",
      card.querySelector(".card-title").value // use .value
    );
    if (newTitle) {
      card.querySelector(".card-title").value = newTitle; // use .value
    }
  });

  card.querySelector(".delete-card").addEventListener("click", (e) => {
    e.stopPropagation();
    const confirmation = confirm("Tem certeza que deseja excluir este cartão?");
    if (confirmation) {
      card.remove();
    }
  });

  card.querySelector("select").addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    const colors = {
      low: "#92a5fb",
      medium: "#fea065",
      high: "#d573b6",
    };
    card.style.backgroundColor = colors[selectedValue];
  });
}

document.querySelectorAll(".kanban-card").forEach((card) => {
  addCardEvents(card);
});

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
      <input type="text" class="card-title" maxlength="20" placeholder="Digite o título" />
      <div class="card-infos">
        <div class="card-icons">
          <button class="comment">
            <i class="fa-regular fa-comment"></i>
            <span class="comment-count" style="display: none">0</span>
          </button>
          <button class="clip">
            <i class="fa-solid fa-paperclip"></i>
          </button>
          <button class="edit-card" aria-label="Editar cartão">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button class="delete-card" aria-label="Excluir cartão">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="comments"></div>
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