import NavMenuMask from './NavMenuMask'
import NavMenuRegular from './NavMenuRegular'

const NavMenu = () => {
	return (
		<div className='fixed top-0 left-0 right-0 z-40 h-screen'>
			<NavMenuMask />
			<NavMenuRegular />
		</div>
	)
}

export default NavMenu
