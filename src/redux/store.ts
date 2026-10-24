import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './features/appSlice';
import navbarReducer from './features/navbarSlice';
import textHoverReducer from './features/textHoverSlice';
import projectCardhoverReducer from './features/projectCardSlice';
import accordionReducer from './features/accordionSlice';
import userAuthReducer from './features/userAuth';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    textHover: textHoverReducer,
    projectCardHover: projectCardhoverReducer,
    navbar: navbarReducer,
    accordion: accordionReducer,
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
