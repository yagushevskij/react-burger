import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FC } from 'react'
import useAppSelector from '../services/custom-hooks/use-app-selector'

const ProtectedAuthRoute: FC = () => {
  const { state } = useLocation()
  const { data: user, request: isRequest } = useAppSelector(state => state.user)
  const isAuth = Object.keys(user).length !== 0

  if (isRequest) return null

  return isAuth ? <Navigate replace to={state?.from.pathname || '/'} /> : <Outlet />
}

export default ProtectedAuthRoute
