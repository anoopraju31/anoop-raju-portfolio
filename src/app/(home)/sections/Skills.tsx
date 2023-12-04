import { IconType } from 'react-icons'
import ParallaxContainer from '@/components/ParallaxContainer'
import { firstContainer, secondContainer } from '@/utills/SkillLogos'

type IconContainerProps = {
	Icon: IconType
}

const IconContainer = (props: IconContainerProps) => {
	const { Icon } = props
	return (
		<div className='text-white hover:text-light-green tap'>
			<Icon />
		</div>
	)
}

const Skills = () => {
	return (
		<section className='px-[10px] md:px-0 pt-0 md:pt-10 lg:pt-20 pb-10 md:pb-[60px] lg:pb-[100px]'>
			<div className='flex justify-center items-center'>
				<h2 className='text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-center font-medium'>
					Skills
				</h2>
			</div>

			{/* Large Screen - Marquee */}
			<div className='mt-[100px] hidden md:flex flex-col gap-7 md:gap-12'>
				<ParallaxContainer baseVelocity={-2}>
					<div className='flex gap-3 md:gap-[25px]'>
						{firstContainer.map(({ id, icon }) => (
							<IconContainer key={id} Icon={icon} />
						))}
					</div>
				</ParallaxContainer>
				<ParallaxContainer baseVelocity={2}>
					<div className='flex gap-3 md:gap-[25px]'>
						{secondContainer.map(({ id, icon }) => (
							<IconContainer key={id} Icon={icon} />
						))}
					</div>
				</ParallaxContainer>
			</div>

			{/* Small Screen List */}
			<div className='mt-[30px] flex md:hidden flex-wrap gap-3 justify-center text-2xl sm:text-3xl'>
				{firstContainer.map(({ id, icon }) => (
					<IconContainer key={id} Icon={icon} />
				))}
				{secondContainer.map(({ id, icon }) => (
					<IconContainer key={id} Icon={icon} />
				))}
			</div>
		</section>
	)
}

export default Skills
