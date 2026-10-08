import { configureStore } from '@reduxjs/toolkit'
import textHoverReducer from './features/textHoverSlice'
import projectCardhoverReducer from './features/projectCardSlice'
import navbarReducer from './features/navbarSlice'
import accordionReducer from './features/accordionSlice'
import appStateReducer from './features/appSlice'

export const store = configureStore({
	reducer: {
		appState: appStateReducer,
		textHover: textHoverReducer,
		projectCardHover: projectCardhoverReducer,
		navbar: navbarReducer,
		accordion: accordionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
