document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('game-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const btnCloseX = document.getElementById('btn-close-x');
  const btnCancel = document.getElementById('btn-cancel');
  const gameForm = document.getElementById('game-form');
  const gamesGrid = document.getElementById('games-grid');
  const emptyState = document.getElementById('empty-state');

  const initialGames = [
    {
      titulo: 'Super Mario World',
      plataforma: 'SNES',
      desenvolvedora: 'Nintendo',
      descricao: 'A clássica aventura do encanador na Terra dos Dinossauros.',
      imagem_url: 'Imagens/mario.jpg',
      preco: 199.90
    },
    {
      titulo: 'Sonic the Hedgehog',
      plataforma: 'Mega Drive',
      desenvolvedora: 'SEGA',
      descricao: 'O ouriço mais rápido do mundo em alta velocidade contra o Dr. Eggman.',
      imagem_url: 'Imagens/sonic.webp',
      preco: 149.50
    },
    {
      titulo: 'Castlevania: SotN',
      plataforma: 'PlayStation 1',
      desenvolvedora: 'Konami',
      descricao: 'Explore o vasto castelo de Dracula com Alucard nesta obra-prima.',
      imagem_url: 'Imagens/castlevania.webp',
      preco: 299.00
    },
    {
      titulo: 'Chrono Trigger',
      plataforma: 'SNES',
      desenvolvedora: 'Square',
      descricao: 'Uma jornada épica através do tempo para salvar o futuro do planeta.',
      imagem_url: 'Imagens/chrono.jpg',
      preco: 349.00
    },
    {
      titulo: 'Street Fighter II',
      plataforma: 'Arcade',
      desenvolvedora: 'Capcom',
      descricao: 'O jogo de luta definitivo que definiu gerações nos fliperamas.',
      imagem_url: 'Imagens/street.webp',
      preco: 129.00
    }
  ];

  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function createGameCard(game) {
    const card = document.createElement('article');
    card.classList.add('game-card');

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${game.imagem_url}" alt="${game.titulo}" onerror="this.src='https://via.placeholder.com/250x350?text=Imagem+Nao+Encontrada'">
        <div class="play-btn">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>
      <h3 class="card-title" title="${game.titulo}">${game.titulo}</h3>
      <p class="card-desc" title="${game.descricao}">${game.descricao}</p>
      <div class="card-footer">
        <span class="card-badge">${game.plataforma}</span>
        <span class="card-price">${formatCurrency(game.preco)}</span>
      </div>
    `;

    return card;
  }

  function checkEmptyState() {
    if (gamesGrid.children.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }

  initialGames.forEach(game => {
    gamesGrid.appendChild(createGameCard(game));
  });
  checkEmptyState();

  btnOpenModal.addEventListener('click', () => modal.showModal());

  function closeModal() {
    modal.close();
    gameForm.reset();
  }

  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  if (btnCloseX) btnCloseX.addEventListener('click', closeModal);

  gameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let imgInput = document.getElementById('imagem_url').value.trim();
    if (!imgInput.startsWith('Imagens/') && !imgInput.startsWith('http')) {
      imgInput = 'Imagens/' + imgInput;
    }

    const newGame = {
      titulo: document.getElementById('titulo').value,
      plataforma: document.getElementById('plataforma').value,
      desenvolvedora: document.getElementById('desenvolvedora').value,
      descricao: document.getElementById('descricao').value,
      imagem_url: imgInput,
      preco: parseFloat(document.getElementById('preco').value)
    };

    gamesGrid.appendChild(createGameCard(newGame));
    checkEmptyState();
    closeModal();
  });
});