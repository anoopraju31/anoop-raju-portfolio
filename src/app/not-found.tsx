import { type FC } from 'react'
import { Particles } from '@/components/Particles'
import Mask from '@/components/mask'
import NotFoundMask from '@/components/notFound/NotFoundMask'
import NotFoundBody from '@/components/notFound/NotFoundBody'

const NotFound: FC = () => {
	return (
		<main className='bg-dark-blue text-white relative'>
			<Particles className='fixed inset-0 h-screen' />

			<div className='absolute top-0 left-0 right-0 bottom-0 w-full'>
				<Mask>
					<NotFoundMask />
				</Mask>
			</div>

			<div className='relative'>
				<NotFoundBody />
			</div>
		</main>
	)
}

export default NotFound
