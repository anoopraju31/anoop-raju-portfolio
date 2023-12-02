import Image from 'next/image'
import React from 'react'

const About = () => {
	return (
		<section className='py-10 md:py-[60px] lg:py-[100px] lg:px-[10px] whitespace-normal break-normal'>
			<div className='max-w-[1400px] mx-auto py-5 px-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center'>
				<div className='flex flex-col justify-start items-start'>
					<div className='relative h-[400px] md:h-[500px] lg:h-full overflow-hidden'>
						<Image
							src='/anoop-raju.jpg'
							className='object-cover'
							alt=''
							width={600}
							height={500}
						/>
						<div className='w-[150px] h-[150px] bg-black absolute top-auto bottom-0 right-0 left-auto' />
						<div className='w-[150px] h-[150px] bg-black absolute top-0 bottom-auto right-auto left-0' />
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
