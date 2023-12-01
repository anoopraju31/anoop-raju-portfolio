import Image from 'next/image'
import React from 'react'

const Hero = () => {
	return (
		<section className='h-[65vh] md:h-[80vh] lg:h-[90vh] md:py-[50px] lg:py-[100px] px-[2%] relative overflow-hidden flex justify-center items-center'>
			<div className='p-5 grid grid-cols-1 gap-5'>
				<div className='flex justify-center items-center gap-[10px]'>
					<h1 className='uppercase font-bold leading-none text-hero-text xl:text-[17em]'>
						Anoop
					</h1>
					<Image
						src='/anoop-raju.jpg'
						className='flex-shrink-0 rounded-full overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px] object-cover'
						alt=''
						width={240}
						height={240}
					/>
					<h1 className='uppercase font-bold leading-none text-hero-text xl:text-[17em]'>
						Raju
					</h1>
				</div>

				<div className='flex justify-between items-center uppercase'>
					<h2 className='text-base sm:text-2xl lg:text-[2rem] leading-none'>
						Web Developer
					</h2>
					<h2 className='text-base sm:text-2xl lg:text-[2rem] leading-none'>
						Living in Kerala
					</h2>
				</div>
			</div>
		</section>
	)
}

export default Hero
