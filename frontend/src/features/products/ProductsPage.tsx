import React from 'react'
import { useGetProductsQuery } from './productSlice'

type Props = {}

const ProductsPage = (props: Props) => {
  const {
    data: posts,
    // isLoading,
    // isSuccess,
    // isError,
    // error
}  = useGetProductsQuery("")
  return (
    <div>ProductsPage{JSON.stringify(posts)}</div>
  )
}

export default ProductsPage