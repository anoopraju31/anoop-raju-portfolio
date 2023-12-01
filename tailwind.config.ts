import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-blue': '#090e16',
				'light-green': '#00ff57',
			},
		},
	},
	plugins: [],
}
export default config
