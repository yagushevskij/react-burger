import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getCookie } from '../utils/helpers'

const ProtectedRoute = () => {
  const isAuth = !!getCookie('accessToken')
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
