import {
	FaReact,
	FaHtml5,
	FaFigma,
	FaGithub,
	FaNodeJs,
	FaCss3,
	FaBootstrap,
} from 'react-icons/fa6'
import {
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiFramer,
	SiMongodb,
	SiReactrouter,
	SiRedux,
	SiMui,
	SiJavascript,
	SiLinux,
	SiPostman,
} from 'react-icons/si'
import { FaGitAlt } from 'react-icons/fa'
import { TbBrandVscode } from 'react-icons/tb'
import { IconType } from 'react-icons'

type SkillIcon = {
	id: number
	icon: IconType
}

export const firstContainer: SkillIcon[] = [
	{ id: 0, icon: FaReact },
	{ id: 1, icon: SiNextdotjs },
	{ id: 2, icon: SiTypescript },
	{ id: 3, icon: FaNodeJs },
	{ id: 4, icon: SiTailwindcss },
	{ id: 5, icon: SiFramer },
	{ id: 6, icon: SiMongodb },
	{ id: 7, icon: SiReactrouter },
	{ id: 8, icon: SiRedux },
	{ id: 9, icon: FaBootstrap },
	{ id: 10, icon: SiMui },
]

export const secondContainer: SkillIcon[] = [
	{ id: 0, icon: FaHtml5 },
	{ id: 1, icon: FaCss3 },
	{ id: 2, icon: SiJavascript },
	{ id: 3, icon: FaFigma },
	{ id: 4, icon: FaGithub },
	{ id: 5, icon: FaGitAlt },
	{ id: 6, icon: TbBrandVscode },
	{ id: 7, icon: SiLinux },
	{ id: 8, icon: SiPostman },
]
