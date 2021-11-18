import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCookie } from '../utils/helpers'

const ProtectedRoute = () => {
  const accessToken = getCookie('accessToken')
  const { data: user, request: isUserRequest } = useSelector(state => state.user)
  const location = useLocation()
  const isAuth = user || accessToken

  if (isUserRequest) {
    return null
  }

  return isAuth ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
