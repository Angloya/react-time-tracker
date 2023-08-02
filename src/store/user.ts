import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserResult } from '../model/interfaces'

interface UserState {
    user: {
        name: string | null,
        email: string | null,
        photoURL: string | null,
        uid: string | null,
    },
    isLogged: boolean,
}

const initialState: UserState = {
    user: {
        name: '',
        email: '',
        photoURL: '',
        uid: ''
    },
    isLogged: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<UserResult>) => {
            state.user = { ...payload }
            state.isLogged = true
        },

        logout: () => initialState,
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer