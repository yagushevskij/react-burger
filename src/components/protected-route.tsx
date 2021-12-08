import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FC } from 'react'
import useAppSelector from '../services/customHooks/useAppSelector'

const ProtectedRoute: FC = () => {
  const { data: user, request: isRequest } = useAppSelector(state => state.user)
  const isAuth = Object.keys(user).length !== 0
  const location = useLocation()

  if (isRequest) return null

  return isAuth ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
