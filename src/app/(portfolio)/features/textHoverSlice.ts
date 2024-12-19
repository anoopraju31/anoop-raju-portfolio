import { createSlice } from '@reduxjs/toolkit'

type TextHover = {
	isHovered: boolean
}

const initialState: TextHover = {
	isHovered: false
}

const texthoverSlice = createSlice({
	name: 'textHover',
	initialState,
	reducers: {
		mouseEnter: (state) => {
			state.isHovered = true
		},
		mouseLeave: (state) => {
			state.isHovered = false
		}
	}
})

export const { mouseEnter, mouseLeave } = texthoverSlice.actions

export default texthoverSlice.reducer
