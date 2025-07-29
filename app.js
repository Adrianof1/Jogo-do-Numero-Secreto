// === NOSSAS CAIXINHAS MÁGICAS (Variáveis) ===
// Imagina que temos caixinhas para guardar as coisas do nosso jogo.

// Este é como um caderno onde anotamos todos os números que já foram sorteados, para não repetir.
let listaDeNumerosSorteados = [];

// Este é o número mais alto que o jogo pode sortear. No nosso caso, é 10.
let numeroLimite = 10;

// Esta é a caixinha que guarda o NÚMERO SECRETO que o jogador precisa adivinhar!
let numeroSecreto = gerarNumeroAleatorio();

// Esta caixinha conta quantas vezes o jogador já tentou adivinhar. Começa com 1.
let tentativas = 1;


// === NOSSAS MÁGICAS (Funções) ===
// Funções são como feitiços: a gente cria uma vez e pode usar quantas vezes quiser!

/**
 * Mágica de Escrever na Tela (e Falar!).
 * Esta mágica pega um texto e o coloca na tela para o jogador ver.
 * E ainda tem um robozinho que fala o texto em voz alta!
 *
 * @param {string} tag - Onde na tela vamos escrever (ex: 'h1' para o título, 'p' para o parágrafo).
 * @param {string} texto - A mensagem que queremos mostrar.
 */
function exibirTextoNaTela(tag, texto) {
    // Pega o pedaço da tela que a gente quer usar.
    let campo = document.querySelector(tag);
    // Escreve o nosso texto nesse pedaço.
    campo.innerHTML = texto;
    // Pede para o robozinho da "ResponsiveVoice" ler o texto em português!
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

/**
 * Mágica de Boas-Vindas.
 * Esta mágica arruma a tela no comecinho do jogo.
 */
function exibirMensagemInicial() {
    // Usa a mágica de escrever para mostrar o título do jogo.
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    // E também usa a mágica para dar a instrução ao jogador.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Lançamos a mágica de boas-vindas assim que a página carrega!
exibirMensagemInicial();

/**
 * Mágica do Juiz: Verificar o Chute!
 * Esta é a mágica mais importante! Ela acontece quando o jogador clica em "Chutar".
 */
function verificarChute() {
    // O juiz espia o número que o jogador escreveu na caixinha de texto.
    let chute = document.querySelector('input').value;

    // O juiz compara o chute com o número secreto...
    if (chute == numeroSecreto) {
        // Se o jogador ACERTOU:
        exibirTextoNaTela('h1', 'Acertou!');

        // Prepara uma frase bonita. Se foi mais de 1 tentativa, fala "tentativas", senão, "tentativa".
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        
        // Mostra a frase de parabéns na tela.
        exibirTextoNaTela('p', mensagemTentativas);

        // Libera o botão "Novo jogo" para que o jogador possa clicar nele.
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // Se o jogador ERROU:
        if (chute > numeroSecreto) {
            // Se o chute foi maior, o juiz dá uma dica.
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            // Se o chute foi menor, o juiz dá outra dica.
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // Aumenta o contador de tentativas em +1.
        tentativas++;
        // Usa a mágica de limpar o campo para o jogador tentar de novo.
        limparCampo();
    }
}

/**
 * Mágica do Sorteio.
 * Esta mágica sorteia um número novo que ainda não foi usado no jogo.
 */
function gerarNumeroAleatorio() {
    // Primeiro, ele sorteia um número qualquer dentro do nosso limite.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Vê quantos números já temos anotados no nosso "caderno".
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se o nosso caderno já está cheio com todos os números possíveis...
    if (quantidadeDeElementosNaLista == numeroLimite) {
        // ...a gente apaga o caderno para começar a sortear tudo de novo.
        listaDeNumerosSorteados = [];
    }
    
    // Agora, ele olha no caderno para ver se o número sorteado já está lá.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se o número JÁ ESTÁ no caderno, a mágica chama ela mesma de novo para sortear OUTRO número.
        return gerarNumeroAleatorio();
    } else {
        // Se for um número novo, que não está no caderno...
        // ... a gente anota ele no caderno...
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // Mostra o caderno no "console" para o programador ver.
        // ...e entrega o número novinho para quem pediu!
        return numeroEscolhido;
    }
}

/**
 * Mágica da Borracha.
 * Esta mágica apaga o que o jogador escreveu na caixinha de chute.
 */
function limparCampo() {
    // Pega a caixinha de texto do jogador.
    chute = document.querySelector('input');
    // Deixa ela vazia, limpinha!
    chute.value = '';
}

/**
 * Mágica de Começar de Novo.
 * Esta mágica arruma tudo para um novo jogo quando o jogador clica em "Novo jogo".
 */
function reiniciarJogo() {
    // Pede um novo número secreto para a mágica do sorteio.
    numeroSecreto = gerarNumeroAleatorio();
    // Usa a mágica da borracha para limpar o campo.
    limparCampo();
    // Reinicia o contador de tentativas para 1.
    tentativas = 1;
    // Usa a mágica de boas-vindas para mostrar as mensagens iniciais.
    exibirMensagemInicial();
    // Trava o botão "Novo jogo" de novo, porque o jogo começou!
    document.getElementById('reiniciar').setAttribute('disabled', true);
}