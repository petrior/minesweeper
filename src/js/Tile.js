export default class Tile {
	constructor (x, y, type, value) {
		this.type = type
		this.x = x
		this.y = y
		this.hidden = true
		this.flag = false
		this.value = value
	}

	get class () {
		if (this.hidden && this.flag) {
			return 'tile-flag'
		}
		if (this.hidden) {
			return 'tile-hidden'
		}
		return 'tile-' + this.type
	}

	toggleFlag () {
		this.flag = !this.flag
	}
}