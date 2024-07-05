export const maskAnimation = (x: number, y: number, size: number) => ({
	WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
	WebkitMaskSize: `${size}px`,
})
export const maskInitialAnimation = {
	WebkitMaskPosition: '-1000px -1000px',
	WebkitMaskSize: '0px',
}
export const maskTransition = {
	type: 'tween',
	ease: 'backOut',
	duration: 0.0001,
	WebkitMaskSize: {
		duration: 0.1,
		type: 'spring',
		damping: 15,
	},
}
export const menuSlide = {
	initial: { y: 'calc(100% + 100px)' },
	enter: {
		y: '0',
		transition: { duration: 0.8, ease: [0.73, 0.06, 0.42, 0.835] },
	},
	exit: {
		y: 'calc(100% + 100px)',
		transition: { duration: 0.8, ease: [0.73, 0.06, 0.42, 0.835] },
	},
}

export const showAnimation = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
}
export const showTransition = {
	duration: 1,
	delay: 0.5,
	ease: [0.73, 0.06, 0.42, 0.835],
}

export const slideToView = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			delay: 1.25,
			duration: 1,
			ease: [0.73, 0.06, 0.42, 0.835],
		},
	},
}
