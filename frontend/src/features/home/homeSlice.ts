import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from 'app/services/apiSlice'
import type { RootState } from 'app/store'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

type AuthState = {
    user: User | null
    token: string | null
  }

export const homeApliSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
      setCredentials: (
        state,
        { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
      ) => {
        state.user = user
        state.token = token
      },
      logOut:(state, action) => {
        state.user = null;
        state.token = null;
      }
    },
  })

export const { setCredentials, logOut } = homeApliSlice.actions
export default homeApliSlice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token


