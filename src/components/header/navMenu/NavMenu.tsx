'use client'

import { type FC, useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import useFooterScrollOverViewport from '@/app/(portfolio)/hooks/useFooterScrollOverViewport'
import { motion, type Variants } from 'framer-motion'
import { Gantari } from 'next/font/google'
import {
	FiArrowUpRight,
	FiCopy,
	FiCheck,
	FiGithub,
	FiLinkedin,
	FiInstagram,
	FiMail
} from 'react-icons/fi'
import Curve from '../Curve'
import NavLink from './NavLink'
import { menuSlide } from '@/utills/animations'

const gantari = Gantari({ weight: '400', subsets: ['latin'] })

const NAV_ITEMS = [
	{ title: 'Home', link: '/' },
	{ title: 'Projects', link: '/projects' },
	{ title: 'Contact', link: '/contact' },
	{ title: 'Blogs', link: '/blogs' }
]

const SOCIAL_LINKS = [
	{ name: 'GitHub', href: 'https://github.com/anoopraju31', icon: FiGithub },
	{ name: 'LinkedIn', href: 'https://www.linkedin.com/in/anoop-raju', icon: FiLinkedin },
	{ name: 'Instagram', href: 'https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/', icon: FiInstagram }
]

const secondaryFadeVariants: Variants = {
	initial: { opacity: 0, y: 30 },
	enter: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
	},
	exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
}

const NavMenu: FC = () => {
	const pathname = usePathname()
	const isBackgroundDark = useFooterScrollOverViewport()
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [isAnyInteractiveHovered, setIsAnyInteractiveHovered] = useState<boolean>(false)
	const [mousePos, setMousePos] = useState({ x: -200, y: -200 })
	const [isCursorInside, setIsCursorInside] = useState(false)
	const [copiedEmail, setCopiedEmail] = useState(false)
	const [localTime, setLocalTime] = useState('')
	const containerRef = useRef<HTMLDivElement>(null)

	// Keep Bengaluru (IST) live clock updated
	useEffect(() => {
		const updateTime = () => {
			const now = new Date()
			const istString = now.toLocaleTimeString('en-US', {
				timeZone: 'Asia/Kolkata',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			})
			setLocalTime(istString)
		}
		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [])

	// Fluid mouse tracking inside the menu overlay
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleMouseMove = (e: MouseEvent) => {
			setMousePos({ x: e.clientX, y: e.clientY })
			if (!isCursorInside) setIsCursorInside(true)
		}

		const handleMouseEnter = () => setIsCursorInside(true)
		const handleMouseLeave = () => {
			setIsCursorInside(false)
			setHoveredIndex(null)
			setIsAnyInteractiveHovered(false)
		}

		container.addEventListener('mousemove', handleMouseMove)
		container.addEventListener('mouseenter', handleMouseEnter)
		container.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			container.removeEventListener('mousemove', handleMouseMove)
			container.removeEventListener('mouseenter', handleMouseEnter)
			container.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [isCursorInside])

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault()
		navigator.clipboard.writeText('anoop2019@iiitkottaya.ac.in')
		setCopiedEmail(true)
		setTimeout(() => setCopiedEmail(false), 2200)
	}

	const currentYear = new Date().getFullYear()

	return (
		<motion.div
			ref={containerRef}
			className={`fixed inset-0 z-50 h-screen w-screen overflow-y-auto overflow-x-hidden ${
				isBackgroundDark ? 'bg-dark-blue text-white' : 'bg-light-green text-dark-blue'
			} transition-colors duration-500`}
			variants={menuSlide}
			initial='initial'
			animate='enter'
			exit='exit'
		>
			{/* Top SVG Curve Transition */}
			<Curve isBackgroundDark={isBackgroundDark} />

			{/* Ambient radial glow in dark mode */}
			{isBackgroundDark && (
				<div className='pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-light-green/5 blur-[140px]' />
			)}

			{/* Custom Smooth Cursor Follower (Desktop only) */}
			{isCursorInside && (
				<motion.div
					className={`pointer-events-none fixed z-[60] hidden md:block rounded-full ${
						isBackgroundDark ? 'bg-light-green' : 'bg-dark-blue'
					}`}
					animate={{
						x: mousePos.x - (isAnyInteractiveHovered ? 24 : 4),
						y: mousePos.y - (isAnyInteractiveHovered ? 24 : 4),
						width: isAnyInteractiveHovered ? 48 : 8,
						height: isAnyInteractiveHovered ? 48 : 8,
						opacity: isAnyInteractiveHovered ? 0.3 : 0.8
					}}
					transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
				/>
			)}

			{/* Main Layout Container */}
			<div className='relative z-10 flex min-h-screen w-full flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-28 md:pt-32 pb-8 max-w-[1500px] mx-auto'>
				
				{/* Top Status & Index Bar */}
				<motion.div
					variants={secondaryFadeVariants}
					initial='initial'
					animate='enter'
					exit='exit'
					className={`flex flex-wrap items-center justify-between border-b pb-4 gap-4 text-xs sm:text-sm font-mono tracking-widest uppercase ${
						isBackgroundDark
							? 'border-white/10 text-white/50'
							: 'border-dark-blue/15 text-dark-blue/60'
					}`}
				>
					<div className='flex items-center gap-2'>
						<span className={`inline-block w-2 h-2 rounded-full ${
									isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80'
								} animate-pulse`} />
						<span>// NAVIGATION DIRECTORY</span>
					</div>

					<div className='flex items-center gap-4'>
						<span>BENGALURU, IN {localTime ? `• ${localTime} IST` : ''}</span>
						<span className='hidden sm:inline opacity-40'>|</span>
						<span className='hidden sm:inline'>[ 04 DESTINATIONS ]</span>
					</div>
				</motion.div>

				{/* Center Content: Two-column layout on larger screens */}
				<div className='my-auto py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
					
					{/* Left / Main Column: Primary Nav Links */}
					<nav className='lg:col-span-7 flex flex-col justify-center'>
						{NAV_ITEMS.map((item, idx) => {
							const isActive =
								item.link === '/'
									? pathname === '/'
									: pathname.startsWith(item.link)

							return (
								<NavLink
									key={item.link}
									title={item.title}
									link={item.link}
									index={idx}
									isActive={isActive}
									isHovered={hoveredIndex === idx}
									isAnyHovered={hoveredIndex !== null}
									onHoverStart={() => {
										setHoveredIndex(idx)
										setIsAnyInteractiveHovered(true)
									}}
									onHoverEnd={() => {
										setHoveredIndex(null)
										setIsAnyInteractiveHovered(false)
									}}
									isBackgroundDark={isBackgroundDark}
								/>
							)
						})}
					</nav>

					{/* Right Column: Editorial Contact & Social Meta */}
					<motion.div
						variants={secondaryFadeVariants}
						initial='initial'
						animate='enter'
						exit='exit'
						className='lg:col-span-5 flex flex-col justify-between space-y-8 lg:pl-10 lg:border-l'
						style={{
							borderColor: isBackgroundDark
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(9, 14, 22, 0.15)'
						}}
					>
						{/* Availability & Bio Card */}
						<div
							className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
								isBackgroundDark
									? 'bg-white/[0.03] border-white/10 hover:border-light-green/40'
									: 'bg-dark-blue/5 border-dark-blue/15 hover:border-dark-blue/30'
							}`}
						>
							<div className='flex items-center gap-2 mb-3'>
								<span className='relative flex h-2.5 w-2.5'>
									<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
									isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80'
								} opacity-75`} />
									<span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
									isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80'
								}`} />
								</span>
								<span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
									isBackgroundDark ? 'text-white/80' : 'text-dark-blue/80'
								}`}>
									Available for new opportunities
								</span>
							</div>
							<p
								className={`text-sm sm:text-base leading-relaxed ${gantari.className} ${
									isBackgroundDark ? 'text-white/80' : 'text-dark-blue/80'
								}`}
							>
								Creative Full Stack Engineer specializing in bespoke web applications,
								high-performance interactive visuals, and resilient cloud architectures.
							</p>
						</div>

						{/* Quick Direct Inquiries */}
						<div>
							<span
								className={`text-xs font-mono uppercase tracking-widest block mb-3 ${
									isBackgroundDark ? 'text-white/40' : 'text-dark-blue/50'
								}`}
							>
								// SAY HELLO
							</span>
							<div className='flex flex-wrap items-center gap-3'>
								<a
									href='mailto:anoop2019@iiitkottaya.ac.in'
									onMouseEnter={() => setIsAnyInteractiveHovered(true)}
									onMouseLeave={() => setIsAnyInteractiveHovered(false)}
									className={`group inline-flex items-center gap-2 text-base sm:text-lg font-medium transition-colors duration-300 underline underline-offset-4 ${
										isBackgroundDark
											? 'text-white hover:text-light-green decoration-white/30 hover:decoration-light-green'
											: 'text-dark-blue hover:opacity-75 decoration-dark-blue/30'
									}`}
								>
									<FiMail className='text-light-green' />
									<span>anoop2019@iiitkottaya.ac.in</span>
									<FiArrowUpRight className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
								</a>

								{/* Copy button */}
								<button
									type='button'
									onClick={handleCopyEmail}
									onMouseEnter={() => setIsAnyInteractiveHovered(true)}
									onMouseLeave={() => setIsAnyInteractiveHovered(false)}
									className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 border transition-all duration-300 ${
										copiedEmail
											? 'bg-light-green text-dark-blue border-light-green font-bold'
											: isBackgroundDark
											? 'border-white/20 text-white/70 hover:border-light-green hover:text-light-green'
											: 'border-dark-blue/30 text-dark-blue hover:bg-dark-blue/10'
									}`}
									title='Copy email address'
								>
									{copiedEmail ? (
										<>
											<FiCheck className='text-sm' />
											<span>COPIED!</span>
										</>
									) : (
										<>
											<FiCopy className='text-sm' />
											<span>COPY</span>
										</>
									)}
								</button>
							</div>
						</div>

						{/* Social Media Links */}
						<div>
							<span
								className={`text-xs font-mono uppercase tracking-widest block mb-3 ${
									isBackgroundDark ? 'text-white/40' : 'text-dark-blue/50'
								}`}
							>
								// CONNECT
							</span>
							<div className='flex flex-wrap gap-2.5'>
								{SOCIAL_LINKS.map((social) => {
									const Icon = social.icon
									return (
										<a
											key={social.name}
											href={social.href}
											target='_blank'
											rel='noopener noreferrer'
											onMouseEnter={() => setIsAnyInteractiveHovered(true)}
											onMouseLeave={() => setIsAnyInteractiveHovered(false)}
											className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono border transition-all duration-300 ${
												isBackgroundDark
													? 'border-white/10 bg-white/[0.02] text-white/80 hover:bg-light-green hover:text-dark-blue hover:border-light-green hover:-translate-y-0.5'
													: 'border-dark-blue/20 bg-dark-blue/[0.03] text-dark-blue hover:bg-dark-blue hover:text-light-green hover:border-dark-blue hover:-translate-y-0.5'
											}`}
										>
											<Icon className='text-sm' />
											<span>{social.name}</span>
											<FiArrowUpRight className='text-xs opacity-60' />
										</a>
									)
								})}
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Meta & Copyright */}
				<motion.div
					variants={secondaryFadeVariants}
					initial='initial'
					animate='enter'
					exit='exit'
					className={`flex flex-wrap items-center justify-between border-t pt-4 gap-4 text-xs font-mono tracking-wider ${
						isBackgroundDark
							? 'border-white/10 text-white/40'
							: 'border-dark-blue/15 text-dark-blue/50'
					}`}
				>
					<p>© {currentYear} ANOOP RAJU. ALL RIGHTS RESERVED.</p>
					<p className='hidden sm:block'>DESIGNED & ENGINEERED FOR HIGH IMPACT</p>
				</motion.div>

			</div>
		</motion.div>
	)
}

export default NavMenu
