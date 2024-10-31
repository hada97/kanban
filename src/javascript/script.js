const cards = document.querySelectorAll('.kanban-card');
const columns = document.querySelectorAll('.kanban-column');

cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
  column.addEventListener('dragover', dragOver);
  column.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.outerHTML);
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault(); // Permite que o drop ocorra
}

function drop(e) {
  e.preventDefault();
  const cardHTML = e.dataTransfer.getData('text/plain');
  const newCard = document.createElement('div');
  newCard.innerHTML = cardHTML;
  newCard.classList.add('kanban-card');
  newCard.setAttribute('draggable', 'true');

  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('dragend', dragEnd);

  const column = e.currentTarget.querySelector('.kanban-cards');
  column.appendChild(newCard);
}
