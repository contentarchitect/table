<template>
	<css-grid :columns="['2fr', '3fr']" gap="8px 0">
		<label for="">Cols</label>
		<div class="table-control">
			<v-button @click="decreaseColsCount">-</v-button>
			<span>{{cols}}</span>
			<v-button @click="increaseColsCount">+</v-button>
		</div>

		<label for="">Rows</label>
		<div class="table-control">
			<v-button @click="decreaseRowsCount">-</v-button>
			<span>{{rows}}</span>
			<v-button @click="increaseRowsCount">+</v-button>
		</div>

		<label for="">Table head</label>
		<div class="table-control">
			<input type="checkbox" v-model="value.thead" />
		</div>
	</css-grid>
</template>

<script>
import { CssGrid, CaInput, Button } from "@contentarchitect/editor"

export default {
	components: { CssGrid, CaInput, "v-button": Button },
	props: ['value'],
	data () {
		return {
			emptyCell: { value: "" }
		}
	},
	computed: {
		rows () {
			return this.value.data.length
		},
		cols () {
			return this.value.data[0].length
		}
	},
	methods: {
		increaseColsCount () {
			this.value.data.forEach((row, i) => {
				row.push({ ...this.emptyCell })
			});
		},
		decreaseColsCount () {
			this.value.data.forEach((row, i) => row.pop());
		},
		increaseRowsCount () {
			const row = Array(this.cols).fill().map(() => ({ ...this.emptyCell }))
			row.id = Math.random()
			this.value.data.push(row)
		},
		decreaseRowsCount () {
			this.value.data.pop()
		},
	},
}
</script>

<style scoped>
.table-control {
	display: flex;
	align-items: stretch;
}

.table-control span {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>