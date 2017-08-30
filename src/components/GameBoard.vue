<template>
	<div>
		<div v-if="victory" class="victory">
			<h1>You win!</h1>
		</div>
		<div class="grid">
			<div class="grid-row" v-for="gridRow in tiles">
				<template v-for="tile in gridRow">
					<tile
						v-on:click.native="handleClick(tile.x, tile.y)" 
						:tile="tile"
						@contextmenu.native="flag($event, tile.x, tile.y)"
						v-twoclick="{ callback: doubleClick, value: { x: tile.x, y: tile.y }}"
						v-on:dblclick.native="doubleClick({x: tile.x, y: tile.y})"
					></tile>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import Tile from '@/components/Tile'
import GameBoard from '@/js/GameBoard'
import EventBus from '@/components/EventBus'

export default {
	name: 'game-board',

	components: {
		Tile
	},

	data () {
		return {
			width: 20,
			height: 20,
			mines: 80,
			tiles: [],
			gameBoard: Object
		}
	},

	directives: {
		// directive for detecting when both mouse buttons
		// are pressed
		'twoclick': {
			bind: function (el, binding) {
				el.mouseOneDown = false
				el.mouseThreeDown = false
				el.addEventListener('mousedown', (event) => {
					if (event.which === 1) {
						el.mouseOneDown = true
					} else if (event.which === 3) {
						el.mouseThreeDown = true
					}
				})
				el.addEventListener('mouseup', (event) => {
					if (event.which === 1) {
						if (el.mouseOneDown && el.mouseThreeDown) {
							binding.value.callback(binding.value.value)
						}
						el.mouseOneDown = false
					} else if (event.which === 3) {
						if (el.mouseOneDown && el.mouseThreeDown) {
							binding.value.callback(binding.value.value)
						}
						el.mouseThreeDown = false
					}
				})
			}
		}
	},

	methods: {
		initialize: function () {
			this.gameBoard = new GameBoard(this.width, this.height, this.mines)
			this.gameBoard.initialize()
			this.tiles = this.gameBoard.getGrid()
		},
		handleClick: function (x, y) {
			this.gameBoard.click(x, y)
		},
		flag: function (event, x, y) {
			event.preventDefault()
			this.gameBoard.addFlag(x, y)
		},
		doubleClick: function (coords) {
			this.gameBoard.doubleClick(coords.x, coords.y)
		}
	},

	computed: {
		victory: function () {
			return this.gameBoard ? this.gameBoard.victory : false
		}
	},

	created () {
		this.initialize()
		EventBus.$on('WIDTH_CHANGED', (payload) => {
			this.width = payload
		});
		EventBus.$on('HEIGHT_CHANGED', (payload) => {
			this.height = payload
		});
		EventBus.$on('MINES_CHANGED', (payload) => {
			this.mines = payload
		});
		EventBus.$on('START', (payload) => {
			this.initialize()
		});
	}
}
</script>

<style>
	.grid {
		display: table;
		table-layout: fixed;
	}
	.grid-row {
		display: table-row;
	}
	.tile {
		display: table-cell;
		min-width: 15px;
		width: 15px;
		height: 15px;
	}
	.tile:not(.hidden) {
		border-left: 1px solid #7C7C7C;
		border-top: 1px solid #7C7C7C;
	}
	.grid > .grid-row > .tile:last-child {
		border-right: 1px solid #7C7C7C;
	}
	.grid > .grid-row:last-child > .tile {
		border-bottom: 1px solid #7C7C7C;
	}
	.tile-1 {
		background: url(../assets/minesweeper_tiles.png) -3px -71px;
	}
	.tile-2 {
		background: url(../assets/minesweeper_tiles.png) -20px -71px;
	}
	.tile-3 {
		background: url(../assets/minesweeper_tiles.png) -37px -71px;
	}
	.tile-4 {
		background: url(../assets/minesweeper_tiles.png) -54px -71px;
	}
	.tile-5 {
		background: url(../assets/minesweeper_tiles.png) -71px -71px;
	}
	.tile-6 {
		background: url(../assets/minesweeper_tiles.png) -88px -71px;
	}
	.tile-7 {
		background: url(../assets/minesweeper_tiles.png) -105px -71px;
	}
	.tile-8 {
		background: url(../assets/minesweeper_tiles.png) -122px -71px;
	}
	.tile-empty {
		background: url(../assets/minesweeper_tiles.png) -20px -54px;
	}
	.tile-hidden {
		background: url(../assets/minesweeper_tiles.png) -3px -54px;
	}
	.tile-mine {
		background: url(../assets/minesweeper_tiles.png) -88px -54px;
	}
	.tile-flag {
		background: url(../assets/minesweeper_tiles.png) -37px -54px;
	}
	.tile-boom {
		background: url(../assets/minesweeper_tiles.png) -105px -54px;
	}
</style>
