import { configureStore } from '@reduxjs/toolkit'
import textHoverReducer from './features/textHoverSlice'
import projectCardhoverReducer from './features/projectCardSlice'
import navbarReducer from './features/navbarSlice'
import accordionReducer from './features/accordionSlice'

export const store = configureStore({
	reducer: {
		textHover: textHoverReducer,
		projectCardHover: projectCardhoverReducer,
		navbar: navbarReducer,
		accordion: accordionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
