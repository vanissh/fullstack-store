import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    types: [],
    brands: [],
    devices: [],
    selectedType: {},
    selectedBrand: {},
    page: 1,
    totalCount: 0,
    limit: 3
}

//https://www.ixbt.com/img/n1/news/2021/8/0/swappie-product-iphone-12-black_large.png
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload
        },
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        setDevices: (state, action) => {
            state.devices = action.payload
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload
        },
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload
        },
        setShopPage: (state, action) => {
            state.page = action.payload
        }

    },
})

const {actions, reducer} = userSlice

export {reducer}

export const {
    setTypes,
    setBrands,
    setDevices,
    setSelectedType,
    setSelectedBrand,
    setTotalCount,
    setShopPage
} = actions