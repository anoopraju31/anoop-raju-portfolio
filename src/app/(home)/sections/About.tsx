import { PT_Sans } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })
const About = () => {
	return (
		<section
			className={`py-10 md:py-[60px] lg:py-[100px] lg:px-[10px] whitespace-normal break-normal ${ptSans.className}`}>
			<div className='max-w-[1400px] h-fit mx-auto py-5 px-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center'>
				<div className='flex flex-col justify-start items-start'>
					<div className='relative w-full h-[400px] md:h-[500px] lg:h-full overflow-hidden'>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full aspect-square object-cover'
							alt=''
							width={600}
							height={500}
						/>
						<div className='w-[150px] h-[150px] bg-black absolute top-auto bottom-0 right-0 left-auto' />
						<div className='w-[150px] h-[150px] bg-black absolute top-0 bottom-auto right-auto left-0' />
					</div>
				</div>

				<div className='flex flex-col justify-start items-start'>
					<div className='w-full h-full flex flex-col justify-center relative lg:p-[25px]'>
						<div className='relative lg:-left-[140px] lg:-top-2'>
							<h2 className='text-3xl md:text-[40px] md:leading-[45px] lg:text-[80px] lg:leading-none font-medium'>
								{' '}
								About Me{' '}
							</h2>
						</div>

						<p className='text-base sm:text-lg leading-5 mb-[10px] font-light'>
							Introducing Paul Vadir, a web design virtuoso based in the heart
							of London. Paul&apos;s journey into the world of web design began
							when he was just a teenager, tinkering with HTML and CSS to bring
							his creative visions to life.
							<br />
							<br />
							With a penchant for creating sleek and user-friendly websites,
							Paul&apos;s work has garnered recognition not only in London but
							also on an international scale. His design philosophy revolves
							around simplicity and aesthetics, transforming intricate concepts
							into visually stunning digital experiences.
							<br />
							<br />
							Outside the world of web design, Paul enjoys exploring the vibrant
							streets of London, finding inspiration in the city&apos;s rich
							history and diverse culture. He firmly believes that a web
							designer&apos;s ability to see beauty in everyday life is a key
							asset in creating exceptional digital experiences.
							<br />
							<br />
							Paul Vadir&apos;s expanding portfolio showcases his talent for
							crafting unique and captivating websites. If you&apos;re in need
							of a digital masterpiece in London, look no further than the
							skilled web designer, Paul Vadir.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
