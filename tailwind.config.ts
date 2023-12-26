import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
	theme: {
		extend: {
			screens: {
				mdlg: '892px',
			},
			colors: {
				'dark-blue': '#090e16',
				'light-green': '#00ff15',
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
			fontSize: {
				'hero-text': 'var(--hero-text-size)',
			},
			transitionProperty: {
				width: 'width',
				top: 'top',
			},
		},
	},
	plugins: [],
}
export default config
