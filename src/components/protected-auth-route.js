import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedAuthRoute = () => {
  const location = useLocation()
  const state = location.state
  const user = useSelector(state => state.user.data)
  const isAuth = Object.keys(user).length !== 0

  return isAuth ? <Navigate replace to={state?.from.pathname || '/'} /> : <Outlet />
}

export default ProtectedAuthRoute
