document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('game-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const btnCloseX = document.getElementById('btn-close-x');
  const btnCancel = document.getElementById('btn-cancel');
  const gameForm = document.getElementById('game-form');
  const gamesGrid = document.getElementById('games-grid');
  const emptyState = document.getElementById('empty-state');

  const API_URL = 'http://localhost:3000/jogos';

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

  async function fetchGames() {
    try {
      const response = await fetch(API_URL);
      const games = await response.json();
      
      gamesGrid.innerHTML = '';
      games.forEach(game => {
        gamesGrid.appendChild(createGameCard(game));
      });
      checkEmptyState();
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
    }
  }

  fetchGames();

  btnOpenModal.addEventListener('click', () => modal.showModal());

  function closeModal() {
    modal.close();
    gameForm.reset();
  }

  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  if (btnCloseX) btnCloseX.addEventListener('click', closeModal);

  gameForm.addEventListener('submit', async (event) => {
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

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
      });

      if (response.ok) {
        closeModal();
        fetchGames(); 
      } else {
        alert('Erro ao salvar o jogo.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  });
});