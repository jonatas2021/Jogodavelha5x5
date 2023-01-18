<svelte:head>
	<link rel="stylesheet" href="/styles/jogar.css">
</svelte:head>

<script>
	import VoltarMenu from './VoltarMenu.svelte'
	import { estado } from "./Estado.js"
	import { trocarEstadoDoJogo } from './Estado.js'
  import { clear_loops } from 'svelte/internal';


const condicaodevitoria = [
	[(0,0), (0,1), (0,2), (0,3)],
	[(1,0), (1,1), (1,2), (1,3)],
	[(2,0), (2,1), (2,2), (2,3)],
	[(3,0), (3,1), (3,2), (3,3)]
]

	// Esta classe representa o estado da tela jogar,
	// ela guarda o estado da tabela com trues e false,
	// a quantidade de atual de elementos verdadeiros,
	// e quantidade verdadeiros necessária para ganhar.
	
	class EstadoTabela {
		constructor(limiteVerdadeiros, tabela) {
			this.limiteVerdadeiros = limiteVerdadeiros
			this.tabela = tabela
			this.verdadeiros = computarVerdadeiros(tabela)
		}
	}

	// não seria melhor gerar aleatoriamente?
	let tabela = [
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
	]

	// toda vez que entramos na tela de jogar o estado do jogo é resetado
	let estadoTabela = new EstadoTabela(4, tabela)

	// não ficaria melhor com POO?
	function computarVerdadeiros(tabela) {
		let verdadeiros = 0
		
		for (let i = 0; i < tabela.length; i++) {
			for (let j = 0; j < tabela[i].length; j++) {
				if (tabela[i][j]) {
					verdadeiros++	
				}
			}
		}
		return verdadeiros
	}

	// esta função contém a lógica do jogo
	function atualizarTabela(i, j) {
		linha = 0
		mapa[i][i]
		l= mapa(linha,0)
		b = true
		for(i=0; i<colunas;i++){
			b = b && (mapa[linha, i])
		}

		i=0
		for(l=0;l<tabela.length;i++){
			for(c=0;c<tabela[l].length;i++){
			if(tabela[l,c] && b == b){
				alert("voce ganhou")
			}
			}
		}

		// atualiza o número de verdadeiros presentes na tabela
/* 		if (estadoTabela.tabela[i][j]) {
			estadoTabela.verdadeiros--
		} else {
			estadoTabela.verdadeiros++
		} */

		// troca o estado do índice na tabela que o jogador clicou
		// após a execução desta linha, o html da página é reconstruído automáticamente pelo svelte.
		x_turn = false
		cellElements.forEach(cell => {
			cell.classlist.remove(x_turn)
			cell.classlist.remove(circle_turn)
			cell.removeEventListener('click')
		})
		circle_turn = false
		if(x_turn){

		}
		estadoTabela.tabela[i][j] = "x"

		// testa se a condição de vitória foi atendida
		if (chegouAoFim(estadoTabela)) {
			alert("Parabéns, você venceu!")
			trocarEstadoDoJogo("menu")
		}

	}

	function chegouAoFim(estadoTabela) {
		return estadoTabela.verdadeiros == condicaodevitoria
	}



</script>

<!-- notem como utilizamos o '{' e '}' para inserir indicar ao svelte como criar o HTML dinâmicamente -->
<h1>
	Falta trocar {estadoTabela.limiteVerdadeiros - estadoTabela.verdadeiros}
</h1>

<!-- criação da tabela de forma dinâmica, similar aos laços duplos do node que vocês já estão cansados de ver -->
<table>
	{#each estadoTabela.tabela as linha, i}
		<tr>
			{#each linha as dado, j}
				<td on:click={() => atualizarTabela(i,j)}>
					{dado}
				</td>
				
			{/each}
		</tr>
	{/each}
</table>

<br>

<!-- reaproveita o botão de voltar para o menu -->
<VoltarMenu/>
