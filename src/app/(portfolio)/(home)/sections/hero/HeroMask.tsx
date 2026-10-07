'use client'

import Image from 'next/image'
import { FiArrowDown } from 'react-icons/fi'
import useAppDispatch from '@/app/(portfolio)/hooks/useAddDispatch'
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector'
import { mouseEnter, mouseLeave } from '@/app/(portfolio)/features/textHoverSlice'
import styles from './hero.module.css'

const HeroMask = () => {
	const dispatch = useAppDispatch()
	const currentCardId = useAppSelector((state) => state.projectCardHover.cardId)

	const handleMouseEnter = () => dispatch(mouseEnter())
	const handleMouseLeave = () => dispatch(mouseLeave())

	return (
		<div className={`${styles.mask} ${currentCardId && 'invisible'}`}>
			<div className={styles['hero-container']}>
				{/* Status Eyebrow Badge */}
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className='flex justify-center mb-1'
				>
					<div className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-dark-blue/40 bg-dark-blue/[0.08] text-dark-blue text-xs sm:text-sm font-mono tracking-wider uppercase font-bold shadow-sm'>
						<span className='w-2 h-2 rounded-full bg-dark-blue animate-pulse' />
						<span>Available for Worldwide Opportunities</span>
					</div>
				</div>

				<div className={styles['hero-heading-container']}>
					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-heading']}
					>
						Anoop
					</span>

					{/* Inverted Avatar Image */}
					<div
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px] rounded-full border-2 border-dark-blue/30 p-1 bg-dark-blue/10 shadow-2xl relative'
					>
						<Image
							src='/anoop-raju.jpg'
							className='w-full h-full rounded-full object-cover filter invert'
							alt='Anoop Raju'
							width={240}
							height={240}
							priority
						/>
					</div>

					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-heading']}
					>
						Raju
					</span>
				</div>

				<div className={styles['hero-subheading-container']}>
					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-subheading']}
					>
						Full Stack Developer
					</span>
					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-subheading']}
					>
						Living in Kerala, India
					</span>
				</div>

				{/* Scroll Down Cue */}
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className='flex justify-center mt-6 sm:mt-8'
				>
					<div className='inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest text-dark-blue font-bold'>
						<span>Explore Projects</span>
						<FiArrowDown className='animate-bounce text-dark-blue' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroMask
