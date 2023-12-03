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
