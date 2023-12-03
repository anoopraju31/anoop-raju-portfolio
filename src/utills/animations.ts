export const maskAnimation = (x: number, y: number, size: number) => ({
	WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
	WebkitMaskSize: `${size}px`,
})
export const maskInitialAnimation = {
	WebkitMaskPosition: '-1000px -1000px',
	WebkitMaskSize: '0px',
}
export const maskTransition = { type: 'tween', ease: 'backOut', duration: 0.5 }
export const menuSlide = {
	initial: { y: 'calc(100% + 100px)' },
	enter: { y: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
	exit: {
		y: 'calc(100% + 100px)',
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
	},
}

const initialPath = `m0 100 L0 200 L${window.innerWidth} 200 L${
	window.innerWidth
} 100 Q${window.innerWidth / 2} -100 0 100`

const targetPath = `m0 100 L0 200 L${window.innerWidth} 200 L${
	window.innerWidth
} 100 Q${window.innerWidth / 2} 100 0 100`

export const curve = {
	initial: {
		d: initialPath,
	},
	enter: {
		d: targetPath,
		transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
	},
	exit: {
		d: initialPath,
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
	},
}
