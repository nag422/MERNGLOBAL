import React from 'react'
import { ProductNavBar } from 'components/navbars'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

type Props = {}

const ProductLayout = (props: Props) => {
  const { user }:{ user:any } = useAuth();
  console.log(user)
  if(!user){
    return <div>      
      <Navigate to="/" state={{ from: "products" }} replace />
    </div>
  }
  
  return (
    <div>
        {user && <ProductNavBar userinfo={user} />}
        <Outlet />
    </div>
  )
}

export default ProductLayout