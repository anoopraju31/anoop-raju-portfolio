import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-blue': '#090e16',
				'light-green': '#00ff57',
			},
			keyframes: {
				marquee: {
					'0%': {
						transform: 'translate3d(0%, 0, 0)',
					},
					'100%': {
						transform: 'translate3d(-100%, 0, 0)',
					},
				},
			},
			animation: {
				marquee: 'marquee 40s linear infinite',
			},
		},
	},
	plugins: [],
}
export default config
