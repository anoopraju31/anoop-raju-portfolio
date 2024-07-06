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
				'light-green': 'rgb(76, 252, 15)', //'#00ff15', #b8ef43
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
				'skill-sm': 'var(--skill-text-size-sm)',
				skill: 'var(--skill-text-size)',
				body: 'clamp(1.1rem, 2vw, 1.3rem)',
				heading: 'clamp(2rem, 5vw, 2.75rem)',
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
