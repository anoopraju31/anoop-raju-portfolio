import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
	name: 'navbar',
	initialState: {
		isMenuOpen: false,
		hover: false
	},
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
