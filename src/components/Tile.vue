<template>
	<div class="tile" :class="tileClass"></div>
</template>

<script>
export default {
	name: 'tile',

	props: {
		tile: { default: Object, type: Object }
	},

	computed: {
		tileClass: function () {
			return this.tile.class
		}
	}
}
</script>

<style>
	
</style>
