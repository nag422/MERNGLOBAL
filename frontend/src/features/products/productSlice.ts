import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/services/apiSlice";
const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/carts',
            transformResponse: (responseData:any) => {
                return productsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result:any, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map((id:any) => ({ type: 'User', id }))
            ]
        })
    })
})

export const {
    useGetProductsQuery
} = productApiSlice