<script>
	// importa os componentes que representam os elementos gráficos do jogo
	import Jogo from './Jogar.svelte'
	import Sobre from './Sobre.svelte'
	import Menu from './Menu.svelte'

	// importa um "writable" que funciona como uma variável global, todos os módulos que a importarem poderão ver o seu valor
	import { estado } from './Estado.js'
</script>

 <!-- Esta não é a melhor forma de criar rotas em um projeto.
 Mais detalhes sobre como criar rotas em:
 https://kit.svelte.dev/docs/routing
 https://www.npmjs.com/package/svelte-routing
 https://www.npmjs.com/package/svelte-router-spa  -->
 

<!-- o jogo tem três estados menu, jogar e sobre, cada um representa uma tela diferente para o usuário -->
{#if $estado === 'menu'}
	<!-- notem como cada componente/módulo que crianos no svelte vira um tag -->
	<Menu/>
{:else if $estado === 'sobre'}
	<Sobre/>
{:else if $estado === 'jogar'}
	<Jogo/>
{/if}