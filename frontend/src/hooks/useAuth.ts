import { selectCurrentUser } from 'features/home/homeSlice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}
