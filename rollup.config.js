import svg from 'rollup-plugin-vue-inline-svg'
import vue from 'rollup-plugin-vue'
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/main.js',
	external: ["vue", '@contentarchitect/editor'],
	output: [
		{
			file: 'dist/table.js',
			format: 'umd',
			name: 'Table',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			}
		},
		{
			file: 'dist/table.min.js',
			format: 'umd',
			name: 'Table',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			},
			plugins: [
				terser({
					keep_classnames: true
				})
			]
		},
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		svg(),
		vue({
			css: true,
			template: {
			  isProduction: true,
			},
			isWebComponent: true // important
		}),
	]
}