<svelte:head>
	<link rel="stylesheet" href="/styles/jogar.css">
</svelte:head>

<h1>
	É a vez do jogardor <!-- {estadoTabela.limiteVerdadeiros - estadoTabela.verdadeiros} -->
</h1>

<div class="container">
	<div class="cell" id="1"></div>
	<div class="cell" id="2"></div>
	<div class="cell" id="3"></div>
	<div class="cell" id="4"></div>
	<div class="cell" id="5"></div>
	<div class="cell" id="6"></div>
	<div class="cell" id="7"></div>
	<div class="cell" id="8"></div>
	<div class="cell" id="9"></div>
	<div class="cell" id="10"></div>
	<div class="cell" id="11"></div>
	<div class="cell" id="12"></div>
	<div class="cell" id="13"></div>
	<div class="cell" id="14"></div>
	<div class="cell" id="15"></div>
	<div class="cell" id="16"></div>
</div>

<div class="mensagemdeVitoria" divMensagemdeVitoria>
	<p class="mensagemdeVitoria-text" divMensagemdeVitoriatexto>X Venceu!</p>
	<button class="mensagemdeVitoria-button" botaodeRestart>
	  Reiniciar!
	</button>
  </div>

<script>
	import VoltarMenu from './VoltarMenu.svelte'
	import { estado } from "./Estado.js"
	import { trocarEstadoDoJogo } from './Estado.js'
  	import { clear_loops } from 'svelte/internal';
    import App from './App.svelte';

const celulas = document.querySelectorAll(".cell");
let checarTurno = true;
const jogador_X = "x";
const jogador_O = "O";

const condicaodevitoria = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
]

document.addEventListener("click", (event) => {
	if(event.target.matches(".cell")){
		Jogar(event.target.id);
	};
});

function jogar(id){
	const cell = document.getElementById(id);
	turno = checarTurno ? jogador_X : jogador_O
	cell.textContent = turno;
	cell.classList.add(turno);
	checarVencedor(turno);
}

function checarVencedor(turno){
	const vencedor = condicaodevitoria.some((comb) => {
		return comb.every((index) => {
			return cell[index].classList.contains(turno);
		});
	});

	if(vencedor){
		fimdeJogo(turno);
	}else if(checarEmpate()){
		fimdoJogo();
	}else{
		checarTurno = !checarTurno
	}
};

function checarEmpate(){
	let x = 0;
	let o = 0;

	for(array in cell){
		if(!isNaN(array)){
			if(cell[array].classList.contains(jogador_X)){
				x++;
			}
			if(cell[array].classList.contains(jogador_O)){
				o++;
			}
		}
	}
	return x + o === 16 ? true : false;
};

function fimdeJogo(vencedor = null){
    //Constante usada para capturar a tela escura do HTML através do id
    const telaPreta = document.getElementById("telapreta");
    //Essas constantes estão criando uma mensagem no formato h2 e h3
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

	telaPreta.style.display = "block";
    telaPreta.appendChild(h2);
    telaPreta.appendChild(h3);


    //Teste do ganhador
    if(vencedor){
        //Aqui aparecerá o jogador que ganhou
       h2.innerHTML = `O jogardor <span>${vencedor}</span> venceu`
    }else{
        //E neste aparecerá o empate, caso não tenha havido ganhador
       h2.innerHTML = "Empatou"
    }

    //variavel contador
    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`
    }, 1000);

    setTimeout(() => location.reload(), 4000)
}


	// Esta classe representa o estado da tela jogar,
	// ela guarda o estado da tabela com trues e false,
	// a quantidade de atual de elementos verdadeiros,
	// e quantidade verdadeiros necessária para ganhar.
	
/* 	class EstadoTabela {
		constructor(limiteVerdadeiros, tabela) {
			this.limiteVerdadeiros = limiteVerdadeiros
			this.tabela = tabela
			this.verdadeiros = computarVerdadeiros(tabela)
		}
	}

	class Jogador{
		constructor(jogador){
			this.jogador = jogador
		}
	} */

	// não seria melhor gerar aleatoriamente?
	
/* 	let tabela = [
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
	] */

	// toda vez que entramos na tela de jogar o estado do jogo é resetado
//	let estadoTabela = new EstadoTabela(4, tabela)

	/* const jogadorX = new Jogador("X")
	const jogadorO = new Jogador("O") */

	// não ficaria melhor com POO?
	function computarVerdadeiros(tabela) {
		let verdadeiros = 0
		
		for (let i = 0; i < tabela.length; i++) {
			for (let j = 0; j < tabela[i].length; j++) {
				if(tabela[i][j]){
					verdadeiros++	
				}
			}
		}
		return verdadeiros
	}

	// esta função contém a lógica do jogo
/* 	function atualizarTabela(i, j) {
		for(i=0; i<colunas;i++){
			for(c=0;c<colunas[i].length;c++){
				
		
			}
		}
		
		function jogadorbola(O){
			O++
		}

		// atualiza o número de verdadeiros presentes na tabela
		if (estadoTabela.tabela[i][j]) {
			estadoTabela.verdadeiros--
		} else {
			estadoTabela.verdadeiros++
		}

		// troca o estado do índice na tabela que o jogador clicou
		// após a execução desta linha, o html da página é reconstruído automáticamente pelo svelte.

		estadoTabela.tabela[i][j] = "x"

		// testa se a condição de vitória foi atendida
		if (chegouAoFim(estadoTabela)) {
			alert("Parabéns, você venceu!")
			trocarEstadoDoJogo("menu")
		}

	} */

	/* function chegouAoFim(estadoTabela) {
		return estadoTabela == condicaodevitoria
	} */

</script>


<!-- notem como utilizamos o '{' e '}' para inserir indicar ao svelte como criar o HTML dinâmicamente -->



<!-- criação da tabela de forma dinâmica, similar aos laços duplos do node que vocês já estão cansados de ver -->
<!-- <table>
	{#each estadoTabela.tabela as linha, i}
		<tr>
			{#each linha as dado, j}
				<td on:click={() => atualizarTabela(i,j)}>
					{dado ? "v" : ""}
				</td>
				
			{/each}
		</tr>
	{/each}
</table> -->

<br>

<!-- reaproveita o botão de voltar para o menu -->
<VoltarMenu/>