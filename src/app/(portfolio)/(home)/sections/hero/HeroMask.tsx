'use client'

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
				<div className={styles['hero-heading-container']}>
					<h1
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-heading']}
					>
						Anoop
					</h1>

					<div className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px]' />

					<h1
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-heading']}
					>
						Raju
					</h1>
				</div>

				<div className={styles['hero-subheading-container']}>
					<h2
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-subheading']}
					>
						Full Stack Developer
					</h2>
					<h2
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-subheading']}
					>
						Living in kerala
					</h2>
				</div>
			</div>
		</div>
	)
}

export default HeroMask
