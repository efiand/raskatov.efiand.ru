import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('rolldown').RolldownOptions} */
export default {
	input: 'src/client/entries/main.js',
	output: {
		file: 'public/bundles/main.js',
		format: 'esm',
		minify: true,
	},
	resolve: {
		alias: {
			'#common': path.join(root, 'app/common'),
			'#core': path.join(root, 'node_modules/site-core'),
		},
	},
};
