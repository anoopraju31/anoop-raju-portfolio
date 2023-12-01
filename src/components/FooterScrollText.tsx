import React from 'react'

const ScrollText = () => {
	return (
		<div className='inline-flex items-center'>
			<h2> Let&apos;s talk </h2>
			<div className='rounded-full mx-[10px] md:mx-5 w-[15px] md:w-[25px] lg:w-[50px] h-[15px] md:h-[25px] lg:h-[50px] bg-dark-blue'></div>
		</div>
	)
}

const FooterScrollText = () => {
	return (
		<div className='w-full overflow-hidden  text-dark-blue font-extrabold uppercase tracking-[0.01em] leading-none whitespace-nowrap text-[10vw] md:text-[15vw]'>
			<div className='inline-block min-w-screen animate-marquee'>
				<ScrollText />
				<ScrollText />
				<ScrollText />
				<ScrollText />
				<ScrollText />
			</div>
			<div className='inline-block min-w-screen animate-marquee'>
				<ScrollText />
				<ScrollText />
				<ScrollText />
				<ScrollText />
				<ScrollText />
			</div>
		</div>
	)
}

export default FooterScrollText
