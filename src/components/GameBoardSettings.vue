<template>
	<div class="settings">
		<div class="control">
			<label>Width</label>
			<input v-model="width" type="number">
		</div>
		<div class="control">
			<label>Height</label>
			<input v-model="height" type="number">
		</div>
		<div class="control">
			<label>Mines</label>
			<input v-model="mines" type="number">
		</div>
		<button v-on:click="start" class="button">Start</button>
	</div>
</template>

<script>
import EventBus from '@/components/EventBus'

export default {
	name: 'game-board-settings',

	watch: {
		width: function () {
			if (this.width * this.height <= this.mines) {
				this.mines = this.width * this.height - 1
			}
			EventBus.$emit('WIDTH_CHANGED', parseInt(this.width))
		},
		height: function () {
			if (this.width * this.height <= this.mines) {
				this.mines = this.width * this.height - 1
			}
			EventBus.$emit('HEIGHT_CHANGED', parseInt(this.height))
		},
		mines: function () {
			if (this.width * this.height <= this.mines) {
				this.mines = this.width * this.height - 1
			}
			EventBus.$emit('MINES_CHANGED', parseInt(this.mines))
		}
	},

	methods: {
		start: function () {
			EventBus.$emit('START', true)
		}
	},

	data () {
		return {
			width: 20,
			height: 20,
			mines: 80
		}
	}
}
</script>

<style>
.control {
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}
.control label {
	margin-bottom: 0.2rem;
}
.control input {
	height: 1.5rem;
}
.button {
	width: 100%;
	height: 2rem;
}
</style>
