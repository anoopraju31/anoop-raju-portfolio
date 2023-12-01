import Link from 'next/link'
import { Gantari } from 'next/font/google'
import FooterScrollText from './FooterScrollText'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const Footer = () => {
	return (
		<footer className='bg-light-green h-full text-dark-blue'>
			<FooterScrollText />
			<div className='h-[2px] bg-dark-blue' />

			<div className='max-w-[1200px] mx-auto px-[10px] bg-light-green h-full'>
				<div className='mt-[40px] sm:mt-[60px] md:mt-[80px] lg:mt-[140px] grid grid-col-1 sm:grid-cols-2 justify-center items-center sm:gap-x-[80px] md:gap-x-[100px] lg:gap-x-[147px] gap-y-[25px]'>
					<div className='self-start grid'>
						<Link
							href='/contact'
							className='block w-fit px-[60px] py-[10px] rounded-[50px] border-dark-blue border-2 uppercase font-medium text-[35px] md:text-[45px] lg:text-[65px] xl:text-[80px] leading-none hover:bg-dark-blue hover:text-light-green transition-colors duration-500'>
							contact me
						</Link>
					</div>

					<ul className={`flex flex-col gap-[30px] ${gantari.className}`}>
						<li className=''>
							<a
								target='_blank'
								className='block tracking-[0.25px] pt-[5px] px-[5px] lg:px-0 pb-[10px] hover:pl-[3vw] transition-all duration-300 text-3xl lg:text-4xl xl:text-5xl uppercase'
								href='https://www.linkedin.com/in/anoop-raju'>
								Linked In
							</a>
							<div className='h-[1.6px] bg-dark-blue '></div>
						</li>
						<li>
							<a
								target='_blank'
								href='https://github.com/anoopraju31'
								className='block tracking-[0.25px] pt-[5px] px-[5px] lg:px-0 pb-[10px] hover:pl-[3vw] transition-all duration-300 text-3xl lg:text-4xl xl:text-5xl uppercase'>
								GitHub
							</a>
							<div className='h-[1.6px] bg-dark-blue '></div>
						</li>
						<li>
							<a
								target='_blank'
								href='https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/'
								className='block tracking-[0.25px] pt-[5px] px-[5px] lg:px-0 pb-[10px] hover:pl-[3vw] transition-all duration-300 text-3xl lg:text-4xl xl:text-5xl uppercase'>
								Instagram
							</a>
							<div className='h-[1.6px] bg-dark-blue '></div>
						</li>
						<li>
							<a
								target='_blank'
								href='mailto:anoop2019@iiitkottaya.ac.in'
								className='block tracking-[0.25px] pt-[5px] px-[5px] lg:px-0 pb-[10px] hover:pl-[3vw] transition-all duration-300 text-3xl lg:text-4xl xl:text-5xl uppercase'>
								Email
							</a>
							<div className='h-[1.6px] bg-dark-blue '></div>
						</li>
					</ul>
				</div>
			</div>

			{/* copy right */}
			<div className='flex justify-center py-5 sm:pt-[80px] md:pt-[100px] lg:pt-[120px] md:pb-10'>
				<p className='text-center font-semibold text-sm md:text-base uppercase tracking-wide'>
					Powered By <span className='text-[#f54848]'>Nextjs</span>. developed
					by <span className='text-[#f54848]'>anoop raju</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
