import { PT_Sans } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })
const About = () => {
	return (
		<section
			className={`py-10 md:py-[60px] lg:py-[100px] lg:px-[10px] whitespace-normal break-normal ${ptSans.className}`}>
			<div className='max-w-[1400px] mx-auto py-5 px-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center'>
				<div className='flex flex-col justify-start items-start'>
					<div className='relative w-full h-[400px] md:h-[500px] lg:h-full overflow-hidden'>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full object-contain'
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
						<div className='relative lg:-left-[140px]'>
							<h2 className='text-3xl md:text-[40px] md:leading-[45px] lg:text-[80px] lg:leading-none font-medium'>
								{' '}
								About Me{' '}
							</h2>
						</div>

						<p className='text-base sm:text-lg leading-5 mb-[10px] font-light'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo iure
							atque quis sequi velit ab! Deleniti obcaecati nobis quaerat nihil
							atque accusantium dignissimos vel suscipit aliquam, reiciendis
							earum quia expedita, consequuntur ratione ipsum beatae facilis
							natus excepturi! Pariatur neque aliquid, tenetur eaque doloribus
							pariatur.
							<br />
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
							adipisci sed pariatur vel ipsum quis facilis, dignissimos iusto
							eveniet reprehenderit quasi quibusdam magni officia explicabo
							maxime unde consequatur officiis exercitationem amet alias atque
							et? Rem nisi tenetur repellat porro voluptatibus veniam,
							consequatur voluptate explicabo quae quia? Vitae laudantium amet
							quae deserunt? Sunt architecto doloremque pariatur quas nihil
							perspiciatis accusantium temporibus repudiandae placeat repellat
							earum nobis dicta eius dolor, similique voluptatum optio a autem
							excepturi eum consectetur a!
							<br />
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
							excepturi quidem soluta vel hic cum molestias nemo! Labore
							nesciunt quaerat ex vero commodi unde earum, sed nostrum doloribus
							vitae, eveniet quae numquam ducimus laboriosam sapiente delectus.
							Nisi maxime voluptatum dolorem deserunt autem repellat illo, quia
							eum doloremque odio impedit nam rem molestias tempora aliquam
							delectus minus consequatur! Ratione quod ea doloremque
							reprehenderit debitis voluptas eligendi necessitatibus, rerum
							quaerat optio. Dignissimos neque maxime placeat ratione dolore
							expedita! Debitis cupiditate beatae placeat, quas repellendus
							architecto consectetur quos nesciunt, in quaerat eum? Eveniet
							incidunt modi quas alias inventore maiores tenetur esse omnis
							nobis?
							<br />
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Suscipit, accusantium?
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
