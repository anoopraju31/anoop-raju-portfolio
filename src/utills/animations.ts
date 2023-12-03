export const maskAnimation = (x: number, y: number, size: number) => ({
	WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
	WebkitMaskSize: `${size}px`,
})
export const maskInitialAnimation = {
	WebkitMaskPosition: '-1000px -1000px',
	WebkitMaskSize: '0px',
}
export const maskTransition = { type: 'tween', ease: 'backOut', duration: 0.5 }
