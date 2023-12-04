import Image from 'next/image'

const ProjectCardBody = ({ img }: { img: string }) => {
	return (
		<Image
			className='w-full h-full object-cover rounded-xl'
			src={img}
			alt='eat curious'
			width={1000}
			height={1000}
		/>
	)
}

export default ProjectCardBody
