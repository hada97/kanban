// Seleciona todos os elementos com a classe '.kanban-card' e adiciona eventos a cada um deles
document.querySelectorAll('.kanban-card').forEach(card => {
  // Evento disparado quando começa a arrastar um card
  card.addEventListener('dragstart', e => {
      // Adiciona a classe 'dragging' ao card que está sendo arrastado
      e.currentTarget.classList.add('dragging');
  });

  // Evento disparado quando termina de arrastar o card
  card.addEventListener('dragend', e => {
      // Remove a classe 'dragging' quando o card é solto
      e.currentTarget.classList.remove('dragging');
  });
});

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll('.kanban-cards').forEach(column => {
  // Evento disparado quando um card arrastado passa sobre uma coluna (drag over)
  column.addEventListener('dragover', e => {
      // Previne o comportamento padrão para permitir o "drop" (soltar) do card
      e.preventDefault();
      // Adiciona a classe 'cards-hover'
      e.currentTarget.classList.add('cards-hover');
  });

  // Evento disparado quando o card sai da área da coluna (quando o card é arrastado para fora)
  column.addEventListener('dragleave', e => {
      // Remove a classe 'cards-hover' quando o card deixa de estar sobre a coluna
      e.currentTarget.classList.remove('cards-hover');
  });

  // Evento disparado quando o card é solto (drop) dentro da coluna
  column.addEventListener('drop', e => {
      // Remove a classe 'cards-hover', já que o card foi solto
      e.currentTarget.classList.remove('cards-hover');

      // Seleciona o card que está sendo arrastado (que tem a classe 'dragging')
      const dragCard = document.querySelector('.kanban-card.dragging');
      
      // Anexa (move) o card arrastado para a coluna onde foi solto
      e.currentTarget.appendChild(dragCard);
  });
});



document.querySelectorAll('.add-card').forEach(button => {
    button.addEventListener('click', function() {
        // Encontre a coluna correspondente
        const column = this.closest('.kanban-column');
        
        // Crie um novo card
        const newCard = document.createElement('div');
        newCard.classList.add('kanban-card');
        newCard.draggable = true;

        // Adicione conteúdo ao novo card
        newCard.innerHTML = `
            <div class="badge low">
                <span>Nova tarefa</span>
            </div>
            <p class="card-title">Título da nova tarefa</p>
            <div class="card-infos">
                <div class="card-icons">
                    <p>
                        <i class="fa-regular fa-comment"></i> 0
                    </p>
                    <p>
                        <i class="fa-solid fa-paperclip"></i> 0
                    </p>
                    <button class="edit-card" aria-label="Editar cartão">
                        <i class="fa-solid fa-pencil"></i>
                    </button> <!-- Botão de edição -->
                </div>
                <div class="user">
                    <img src="" alt="">
                </div>
            </div>
        `;

        // Adicione o novo card à coluna
        const cardsContainer = column.querySelector('.kanban-cards');
        cardsContainer.appendChild(newCard);

        // Adiciona a funcionalidade de edição ao novo card
        newCard.querySelector('.edit-card').addEventListener('click', () => {
            const newTitle = prompt("Digite o novo título da tarefa:", newCard.querySelector('.card-title').textContent);
            if (newTitle) {
                newCard.querySelector('.card-title').textContent = newTitle;
            }
        });
    });
});
