import { type FC } from 'react'
import Image from 'next/image'

type Props = {
	name: string
	img: string
	alt: string
	link: string
	year: string
	tools: string
}

const ProjectCard: FC<Props> = ({ name, img, alt, link, tools, year }) => {
	return (
		<div>
			<a
				target='_blank'
				rel='noreferrer'
				href={link}
				className='img group inline-block overflow-hidden duration-200 ease-linear hover:rounded-3xl'>
				<Image
					className='w-screen duration-700 ease-in-out group-hover:scale-105'
					src={img}
					alt={alt}
					width='800'
					height='600'
				/>
			</a>
			<div className='mt-4'>
				<div className='mb-3 flex space-x-2'>
					<p className='flex items-center justify-center rounded-full border border-light-green bg-transparent px-4 py-1 text-body-4 text-light-green'>
						{year}
					</p>
					<p className='flex items-center justify-center rounded-full border border-light-green bg-transparent px-4 py-1 text-body-4 text-light-green'>
						{tools}
					</p>
				</div>
				<div className='2xl:space-y-3'>
					<h3 className='text-works-title font-medium uppercase text-white 2xl:text-5xl'>
						{name}
					</h3>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
