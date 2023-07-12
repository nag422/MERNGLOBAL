import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from '../store'


export interface User {
    email: string
    token: string
  }

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3500',
        credentials: 'include',
        prepareHeaders: (headers, { getState }: any) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
            return headers
          },
    }),    
    tagTypes: ['User', 'Product'],
    endpoints: builder => ({})
})

