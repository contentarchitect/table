<template>
	<table>
		<caption v-edit:[captionSettings]="value.caption"></caption>
		<thead v-if="value.thead">
			<tr>
				<th 
					v-for="(col, i) in value.data[0]"
					:key="i"
					v-edit.block.complex="{ obj: value.data[0][i], exp: 'value' }"
				></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, i) in tbody" :key="row.id">
				<td
					v-for="(col, j) in row"
					:key="j"
					v-edit.block.complex="{ obj: tbody[i][j], exp: 'value' }"
				></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { EditDirective } from "@contentarchitect/editor"

export default {
	props: ['value'],
	directives: {
		edit: EditDirective
	},
	data () {
		return {
			captionSettings: {
				placeholder: "Table caption"
			}
		}
	},
	created () {
		this.value.data.forEach(row => {
			row.id = Math.random()
		});
	},
	methods: {
		randomKey () {
			return Math.random()
		}
	},
	computed: {
		tbody () {
			return this.value.thead
				? this.value.data.slice(1, this.value.data.length)
				: this.value.data
		}
	}
}
</script>

<style>
</style>