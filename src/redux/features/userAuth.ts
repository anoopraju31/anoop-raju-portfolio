import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AuthSlice, LogoutResponse, UserAuth } from '../../../types';
import { AUTH_FAILURE, AUTH_IDLE, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS } from '@/constants/auth';
import { BACKEND_URL } from '@/utills/env';

const initialState: AuthSlice = {
  user: null,
  status: AUTH_IDLE,
};

export const fetchUserAuth = createAsyncThunk('userAuth/fetchUserAuth', async (_, thunkAPI) => {
  try {
    const URL = `${BACKEND_URL}/v1/users/auth`;
    const userAuth = await axios.get<UserAuth>(URL, { withCredentials: true });

    return userAuth.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(null);
  }
});

export const fetchUserLogout = createAsyncThunk('userAuth/fetchUserLogout', async (_, thunkAPI) => {
  try {
    const URL = `${BACKEND_URL}/v1/users/auth/logout`;

    await axios.get<LogoutResponse>(URL, { withCredentials: true });

    return null;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(null);
  }
});

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.status = AUTH_LOGOUT;
    },
    setUser: (state, action: PayloadAction<UserAuth>) => {
      state.user = action.payload;
      state.status = AUTH_SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuth.pending, (state) => {
        state.user = null;
        state.status = AUTH_LOADING;
      })
      .addCase(fetchUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = AUTH_SUCCESS;
      })
      .addCase(fetchUserAuth.rejected, (state) => {
        state.user = null;
        state.status = AUTH_FAILURE;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.user = null;
        state.status = AUTH_LOGOUT;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.user = null;
        state.status = AUTH_LOGOUT;
      })
      .addCase(fetchUserLogout.rejected, (state) => {
        state.user = null;
        state.status = AUTH_FAILURE;
      });
  },
});

export const { setLogout, setUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
