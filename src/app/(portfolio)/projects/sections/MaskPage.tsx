'use client'

// import { useMouse } from '@uidotdev/usehooks'
// import { Ref, useState } from 'react'
// import { motion } from 'framer-motion'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import Mask from '@/components/mask'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import MaskProductCard from '../_components/projectCard/mask'
import styles from './projects.module.css'

const MaskPage = () => {
	const dispatch = useAppDispatch()

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className='absolute top-0 left-0 right-0 w-full'>
			<Mask>
				<div className={styles.maskPage}>
					<div className={styles.container}>
						<div
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							className={styles.heading__container}
						>
							<h1>All Projects</h1>
						</div>

						<div className={styles.project__container}>
							<div className={styles.project1__container}>
								<MaskProductCard
									id={1}
									link='https://eat-curious-wysm.vercel.app/'
									img='/eat-curious.png'
									alt='eat-curious'
									name='Eat Curious'
									year='2023'
									tools='NextJS • ReactJS • TailwindCSS • Typescript'
								/>
							</div>
							<div className={styles.project2__container}>
								<MaskProductCard
									id={2}
									link='https://react-ai-article-summarizer.netlify.app/'
									img='/summerize.png'
									alt='Summarizer'
									name='Summarizer'
									year='2023'
									tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
								/>
							</div>
							<div className={styles.project3__container}>
								<MaskProductCard
									id={3}
									link='https://github.com/anoopraju31/netflix-gpt'
									img='/netflix-gpt.png'
									alt='NetFlix GPT'
									name='NetFlix GPT'
									year='2023'
									tools='ReactJS • TailwindCSS • JavaScript • OpenAI API'
								/>
							</div>
							<div className={styles.project4__container}>
								<MaskProductCard
									id={4}
									link='https://github.com/anoopraju31/nike-landing-page'
									img='/nike.png'
									alt='nike page mockup'
									name='Nike LANDING PAGE CLONE'
									year='2023'
									tools='ReactJS • TailwindCSS • JavaScript'
								/>
							</div>
							<div className={styles.project5__container}>
								<MaskProductCard
									id={5}
									link='https://nextjs-dropbox-clone.vercel.app/'
									img='/dropbox.png'
									alt='Dropbox mockup'
									name='Dropbox PAGE'
									year='2023'
									tools='NextJS • TailwindCSS • Typescript'
								/>
							</div>
						</div>
					</div>
				</div>
			</Mask>
		</div>
	)
}

export default MaskPage
