/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				// Define un color 'current-skill-color' que usa la variable CSS nativa
				'current-skill-color': 'var(--skill-color)',
			},
		},
	},
	plugins: [],
}
