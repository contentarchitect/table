<template>
	<css-grid :columns="['2fr', '3fr']" gap="8px 0">
		<label for="">Cols</label>
		<div class="table-control">
			<sp-action-button @click="decreaseColsCount">
				<sp-icon :icon="$options.components.Remove"></sp-icon>
			</sp-action-button>
			<span>{{cols}}</span>
			<sp-action-button @click="increaseColsCount">
				<sp-icon :icon="$options.components.Add"></sp-icon>
			</sp-action-button>
		</div>

		<label for="">Rows</label>
		<div class="table-control">
			<sp-action-button @click="decreaseRowsCount">
				<sp-icon :icon="$options.components.Remove"></sp-icon>
			</sp-action-button>
			<span>{{rows}}</span>
			<sp-action-button @click="increaseRowsCount">
				<sp-icon :icon="$options.components.Add"></sp-icon>
			</sp-action-button>
		</div>

		<label for="">Table head</label>
		<div class="table-control">
			<sp-switch v-model="value.thead" />
		</div>
	</css-grid>
</template>

<script>
import {
	CssGrid,
	SpSwitch,
	SpIcon,
	SpActionButton
} from "@contentarchitect/editor"
import Add from 'vue-spectrum-workflow-icons/dist/Add'
import Remove from 'vue-spectrum-workflow-icons/dist/Remove'

export default {
	components: {
		CssGrid,
		SpSwitch,
		SpIcon,
		SpActionButton,
		Add,
		Remove,
	},
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
	align-items: center;
}

.table-control span {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>