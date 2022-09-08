import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: {},
    basket: [],
    isAdmin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        }
    },
})

const {actions, reducer} = userSlice

export {reducer}

export const {
    setIsAuth,
    setUser,
    setBasket,
    setIsAdmin
} = actions