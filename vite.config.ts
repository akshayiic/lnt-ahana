// vite.config.js

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
	// Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development|staging)'
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
	return defineConfig({
		plugins: [sveltekit()],
		envDir: './environments',
		define: {
			'process.env.NODE_ENV': JSON.stringify(mode)
		}
	});
};
