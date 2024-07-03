import { createSlice } from '@reduxjs/toolkit'

type projectCardHover = {
	cardId: number | null
	link: string | null
}

const initialState: projectCardHover = {
	cardId: null,
	link: null,
}

const projectCardhoverSlice = createSlice({
	name: 'projectCardHover',
	initialState,
	reducers: {
		projectCardMouseEnter: (state, action) => {
			state.cardId = action.payload.cardId
			state.link = action.payload.link
		},
		projectCardMouseLeave: (state) => {
			state.cardId = null
			state.link = null
		},
	},
})

export const { projectCardMouseEnter, projectCardMouseLeave } =
	projectCardhoverSlice.actions

export default projectCardhoverSlice.reducer
