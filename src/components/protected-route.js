import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  const {data: user, request: isRequest} = useSelector(state => state.user)
  const isAuth = Object.keys(user).length !== 0
  const location = useLocation()

  if (isRequest) return null

  return isAuth ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
