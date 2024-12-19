import { accordionData } from '@/utills/constants'
import { createSlice } from '@reduxjs/toolkit'

const initialState = () =>
	accordionData.map((data) => ({
		id: data.id,
		isOpen: false
	}))

const accordionSlice = createSlice({
	name: 'accordion',
	initialState,
	reducers: {
		toggleAccordion: (state, action) => {
			state.map((item) => {
				if (item.id === action.payload.id) item.isOpen = !item.isOpen

				return item
			})
		}
	}
})

export const { toggleAccordion } = accordionSlice.actions
export default accordionSlice.reducer
