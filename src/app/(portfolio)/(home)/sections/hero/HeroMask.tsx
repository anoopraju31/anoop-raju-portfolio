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
					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-heading']}
					>
						Anoop
					</span>

					<div className='flex-shrink-0 overflow-hidden w-[var(--hero-image-width)] xl:w-[240px] h-[var(--hero-image-width)] xl:h-[240px]' />

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
						Frontend Developer
					</span>
					<span
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={styles['hero-subheading']}
					>
						Living in kerala, India
					</span>
				</div>
			</div>
		</div>
	)
}

export default HeroMask
