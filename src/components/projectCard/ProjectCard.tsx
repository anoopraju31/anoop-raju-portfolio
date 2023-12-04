import Image from 'next/image'

const ProjectCard = ({ img }: { img: string }) => {
	return (
		<div className='w-full h-full'>
			<Image
				className='w-full h-full object-cover rounded-xl'
				src={img}
				alt='eat curious'
				width={1000}
				height={1000}
			/>
		</div>
	)
}

export default ProjectCard
