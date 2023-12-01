import Link from 'next/link'
import React from 'react'

const Projects = () => {
	return (
		<section className='pb-10 z-50'>
			<div className='py-5 px-[10px] flex flex-col lg:flex-row gap-4'>
				<div className='w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 bg-red-500 h-[50vh] lg:h-[90vh] transition-width ease-in-out duration-300'></div>
				<div className='w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 bg-red-500 h-[50vh] lg:h-[90vh] transition-width ease-in-out duration-300'></div>
				<div className='w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 bg-red-500 h-[50vh] lg:h-[90vh] transition-width ease-in-out duration-300'></div>
				<div className='w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 bg-red-500 h-[50vh] lg:h-[90vh] transition-width ease-in-out duration-300'></div>
				<div className='w-full lg:w-[20vw] lg:hover:w-[50vw] lg:hover:flex-shrink-0 bg-red-500 h-[50vh] lg:h-[90vh] transition-width ease-in-out duration-300'></div>
			</div>

			<div className='py-5 lg:py-10  flex justify-center items-center'>
				<Link
					href='/projects'
					className='px-5 py-[15px] text-lg lg:text-xl rounded-3xl uppercase border border-white'>
					View More Projects
				</Link>
			</div>
		</section>
	)
}

export default Projects
