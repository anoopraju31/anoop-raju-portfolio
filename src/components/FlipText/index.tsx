import { type FC } from 'react'
import { motion } from 'framer-motion'

const DURATION = 0.25
const STAGGER = 0.025

type Props = {
	title: string
}

const Fliptitle: FC<Props> = ({ title }) => {
	return (
		<motion.div
			initial='initial'
			whileHover='hovered'
			className='relative block overflow-hidden whitespace-nowrap uppercase'
			style={{
				lineHeight: 0.75
			}}
		>
			<div>
				{title.split('').map((l, i) => (
					<motion.span
						variants={{
							initial: {
								y: 0
							},
							hovered: {
								y: '-100%'
							}
						}}
						transition={{
							duration: DURATION,
							ease: 'easeInOut',
							delay: STAGGER * i
						}}
						className='inline-block'
						key={`${title}-${l}-${i}`}
					>
						{l}
					</motion.span>
				))}
			</div>
			<div className='absolute inset-0'>
				{title.split('').map((l, i) => (
					<motion.span
						variants={{
							initial: {
								y: '100%'
							},
							hovered: {
								y: 0
							}
						}}
						transition={{
							duration: DURATION,
							ease: 'easeInOut',
							delay: STAGGER * i
						}}
						className='inline-block'
						key={`${title}-${l}-${i}-overlay`}
					>
						{l}
					</motion.span>
				))}
			</div>
		</motion.div>
	)
}
export default Fliptitle
