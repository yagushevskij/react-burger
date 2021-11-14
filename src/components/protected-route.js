import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  const { user, isRequest } = useSelector(state => state.auth)
  const location = useLocation()

  if (isRequest) {
    return null
  }

  return user ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
