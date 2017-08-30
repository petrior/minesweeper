<template>
  <div id="app">
  	<h1>Minesweeper</h1>
  	<div class="game">
	  	<game-board-settings></game-board-settings>
	    <game-board></game-board>
	</div>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard'
import GameBoardSettings from './components/GameBoardSettings'

export default {
  name: 'app',
  components: {
    GameBoard,
    GameBoardSettings
  }
}
</script>

<style>
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
h1 {
	padding: 1rem;
}
.game {
	display: flex;
	flex-direction: row;
}
.settings {
	min-width: 100px;
	padding: 1rem;
	padding-top: 0;
}
</style>
