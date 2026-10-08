import { createSlice } from '@reduxjs/toolkit';

export type AppStateSlice = {
  lenisScrollRoot: boolean;
};


const initialState: AppStateSlice = {
  lenisScrollRoot: true,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    toggleLenisScrollRoot: (state) => {
      state.lenisScrollRoot = !state.lenisScrollRoot;
    },
  },
});

export const {
  toggleLenisScrollRoot,
} = appStateSlice.actions;

export default appStateSlice.reducer;
