import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/services/apiSlice";
const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products/list',
            transformResponse: (responseData:any) => {
                const parsedproducts = responseData.products;
                const allProducts = parsedproducts.reduce((products:any, prod:any) => {
                    const category = prod.brand
                    if (products[category] == null) products[category] = []
                    products[category].push(prod)
                    return products
                },{})
                
                return allProducts              
            },
            // providesTags: (result:any, error, arg) => [
            //     { type: 'Product', id: "LIST" },
            //     ...result.ids.map((id:any) => ({ type: 'User', id }))
            // ]
            providesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery
} = productApiSlice