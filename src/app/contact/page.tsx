import { PT_Sans } from 'next/font/google'
import { Particles } from '@/components/Particles'
import ContactForm from './components/contactForm'

const ptSans = PT_Sans({ weight: '400', subsets: ['latin'] })
const ContactPage = () => {
	return (
		<main
			className={`bg-dark-blue text-white relative z-10 ${ptSans.className}`}>
			<Particles className='fixed inset-0 -z-10' />
			<section className='w-full max-w-[1200px] mx-auto px-5 h-full'>
				<div className='py-[40px] sm:py-[60px] md:py-[80px] lg:py-[140px] flex flex-col items-center gap-[100px]'>
					<h1 className='text-[40px] md:text-[48px] lg:text-[54px] font-medium leading-normal capitalize'>
						{' '}
						hire me for your next amazing project{' '}
					</h1>

					<div className='flex flex-col lg:flex-row  items-center gap-20 lg:gap-[100px] 2xl:gap-[150px]'>
						<div className='flex pt-[60px] flex-col justify-between items-start flex-1 self-stretch'>
							<h2 className='text-[18px] sm:text-[28px] 2xl:text-[40px] font-light leading-[23px] sm:leading-[36px] 2xl:leading-[52px]'>
								Let’s make somthing new, different and more meaningful or make
								thing more visual or conceptual? Just say hello!
							</h2>

							<div className='flex flex-col items-start gap-4'>
								<div className='flex items-center gap-5'>
									<div className='w-[22px] h-[1px] bg-white' />
									<p className='text-[20px] font-light'> +91 8921222748 </p>
								</div>

								<div className='flex items-center gap-5'>
									<div className='w-[22px] h-[1px] bg-white' />
									<p className='text-[20px] font-light'>
										{' '}
										anoop@iiitkottayam.ac.in{' '}
									</p>
								</div>

								<div className='flex items-center gap-5'>
									<div className='w-[22px] h-[1px] bg-white' />
									<p className='text-[20px] font-light'>
										{' '}
										Adoor, Pathanamthitta, Kerala, India{' '}
									</p>
								</div>
							</div>
						</div>

						<div className='flex w-full lg:w-[505px] py-20 px-5 sm:px-10 md:px-[60px] flex-col justify-center items-center gap-5 flex-shrink-0 border border-white'>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ContactPage
