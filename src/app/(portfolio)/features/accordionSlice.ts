import { accordionData } from '@/utills/constants'
import { createSlice } from '@reduxjs/toolkit'

const initialState = () => {
    const accordion = accordionData.map(data => ({
        id: data.id,
        isOpen: false
    }))
}

const navbarSlice = createSlice({
	name: 'accordion',
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen
		},
		closeMenu: (state) => {
			state.isMenuOpen = false
		},
		openMenu: (state) => {
			state.hover = true
		},
		startHover: (state) => {
			state.hover = true
		},
		endHover: (state) => {
			state.hover = false
		}
	}
})

export const { endHover, startHover, toggleMenu, closeMenu, openMenu } = navbarSlice.actions
export default navbarSlice.reducer
