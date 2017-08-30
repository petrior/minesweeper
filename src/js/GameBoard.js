import Tile from '@/js/Tile'

export default class GameBoard {

	constructor(width, height, mines) {
		this.height = height
		this.width = width
		this.mines = mines
		this.revealedTiles = 0
	}

	getGrid() {
		return this.grid
	}

	initialize () {
		this.grid = this.createGrid()
		this.populateGrid()
	}

	createGrid () {
		let arr = new Array(this.height)
		for (var i = 0; i < arr.length; i++) {
			arr[i] = new Array(this.width)
		}
		return arr
	}

	populateGrid () {
		this.populateMines()
		this.populateNumbers()
	}

	possiblePositions () {
		let possiblePositions = []
		this.iterateGrid((x, y) => {
			possiblePositions.push({x: x, y: y})
		})
		return possiblePositions
	}

	populateMines () {
		let possiblePositions = this.possiblePositions()
		for (let i = 0; i < this.mines; i++) {
			let index = Math.floor(Math.random() * possiblePositions.length)
			this.grid[possiblePositions[index].y][possiblePositions[index].x] = new Tile(
				possiblePositions[index].x,
				possiblePositions[index].y,
				'mine'
			)
			possiblePositions.splice(index, 1)
		}
	}

	iterateGrid (callback) {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				callback(x, y)
			}
		}
	}

	iterateNeighbours (x, y, callback) {
		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				callback(i, j)
			}
		}
	}

	populateNumbers () {
		this.iterateGrid((x, y) => {
			if (this.grid[y][x] !== undefined) {
				return
			}
			let number = this.countNeighbours(x, y)
			let type = ''
			if (number === 0) {
				type = 'empty'
			} else {
				type = number.toString()
			}
			this.grid[y][x] = new Tile(x, y, type, number)
		})
	}

	countNeighbours (x, y) {
		let count = 0
		this.iterateNeighbours(x, y, (i, j) => {
			if (i < 0 || j < 0 || i > this.width - 1 || j > this.height - 1) {
				return
			}
			if (this.grid[j][i] !== undefined && this.grid[j][i].type === 'mine') {
				count++
			}
		})
		return count
	}

	gameOver (x, y) {
		this.grid[y][x].type = 'boom'
		this.iterateGrid((i, j) => {
			this.grid[j][i].hidden = false
		})
	}

	floodFill (x, y) {
		if (!this.grid[y][x].hidden) {
			return
		}

		this.grid[y][x].hidden = false
		this.revealedTiles++

		if (this.grid[y][x].type !== 'empty') {
			return
		}
		// not using iterateGrid here, because call stack is already limited
		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				if (i < 0 || j < 0 || i > this.width - 1 || j > this.height - 1) {
					continue
				}
				this.floodFill(i, j)
			}
		}
	}

	click (x, y) {
		if (!this.grid[y][x].hidden || this.grid[y][x].flag)
			return
		if (this.grid[y][x].type === 'mine') {
			this.gameOver(x, y)
		}
		this.floodFill(x, y)
	}

	get victory () {
		return this.revealedTiles + this.mines - this.width * this.height === 0
	}

	doubleClick (x, y) {
		if (this.grid[y][x].hidden || this.grid[y][x].flag) {
			return
		}

		let flagCount = 0
		this.iterateNeighbours(x, y, (i, j) => {
			if (i < 0 || j < 0 || i > this.width - 1 || j > this.height - 1) {
				return
			}
			if (this.grid[j][i].flag) {
				flagCount++
			}
		})

		if (flagCount !== this.grid[y][x].value) {
			return
		}

		this.iterateNeighbours(x, y, (i, j) => {
			if (i < 0 || j < 0 || i > this.width - 1 || j > this.height - 1) {
				return
			}
			if (this.grid[j][i].flag) {
				return
			}
			this.click(i, j)
		})
	}

	addFlag (x, y) {
		if (this.grid[y][x].hidden) {
			this.grid[y][x].toggleFlag()
		}
	}
}
