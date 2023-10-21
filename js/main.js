// Configurando um monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function () {
    
    // Definição das variáveis para receber os elementos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
    const resetButton = document.getElementById('reset-button');    
    let jogadorAtual = 'Hulk';
    let jogoAtivo = true;

    // Criação e inicialização do array do tabuleiro
    let tabuleiro = ['', '', '', '', '', '', '', '', ''];    

    // Definição do array das jogadas
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Criação da função clica para preencher o array com os cliques
    function clica(event) {
        const celula = event.target;
        const indice = Array.from(celulas).indexOf(celula);

        // Se as células estiverem vazias, encerra a execução da função
        if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
        }

        // Caso continue, armazena o jogador em cada célula
        tabuleiro[indice] = jogadorAtual;        
        celula.appendChild(carregaImagem(jogadorAtual));

        // Conforme as verificações das jogadas, envia as mensagens adequadas
        if (verifica(jogadorAtual)) {
            jogoAtivo = false;
            status.textContent = `O jogador ${jogadorAtual} venceu!`;
        } else if (tabuleiro.includes('')) {
            jogadorAtual = jogadorAtual === 'Hulk' ? 'IronMan' : 'Hulk';
            status.textContent = `É a vez do jogador ${jogadorAtual}`;
        } else {
            jogoAtivo = false;
            status.textContent = 'Empate!';
        }
    }

    // Função que verifica as jogadas e identifica o vencedor, se tiver.
    function verifica(jogador) {
        for (const jogadas of possibilidades) {
            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }
        return false;
    }

    // Função para buscar a imagem corresponde e inserir na célula
    function carregaImagem(jogador) {
        const imagem = new Image();

        // Utilização do operador ternário (condicional if(se composto))
        imagem.src = jogador === 'Hulk' ? 'images/hulk.png' : 'images/ironman.png';
        imagem.alt = jogador;
        return imagem;
    }

    // Função que limpa o tabuleiro para nova jogada
    function resetaJogo() {
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        jogadorAtual = 'Hulk';
        celulas.forEach((celula) => {
            celula.textContent = '';
            while (celula.firstChild) {
                celula.removeChild(celula.firstChild);
            }
        });
        status.textContent = `É a vez do jogador ${jogadorAtual}`;
    }

    // Dispara o evento Click do mouse, chamando a função clica()
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    // Dispara o evento click do mouse, chamando a função resetaJogo()
    resetButton.addEventListener('click', resetaJogo);
});
