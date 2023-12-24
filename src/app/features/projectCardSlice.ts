import { createSlice } from '@reduxjs/toolkit'

type projectCardHover = {
	cardId: number | null
}

const initialState: projectCardHover = {
	cardId: null,
}

const projectCardhoverSlice = createSlice({
	name: 'projectCardHover',
	initialState,
	reducers: {
		projectCardMouseEnter: (state, action) => {
			state.cardId = action.payload
		},
		projectCardMouseLeave: (state) => {
			state.cardId = null
		},
	},
})

export const { projectCardMouseEnter, projectCardMouseLeave } =
	projectCardhoverSlice.actions

export default projectCardhoverSlice.reducer
