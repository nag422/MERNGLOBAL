import {apiSlice} from "app/services/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder:any) => ({
        login: builder.mutation({
            query: (credentials:any) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: (credentials:any) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApiSlice;