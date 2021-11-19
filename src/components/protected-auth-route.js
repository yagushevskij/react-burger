import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../utils/helpers'
import { useEffect } from 'react'
import { getUser } from '../services/actions/thunk/user'

const ProtectedAuthRoute = () => {
  const location = useLocation()
  const state = location.state
  // const dispatch = useDispatch()
  // useEffect(() => {
  //       dispatch(getUser())
  // })
  // const accessToken = getCookie('accessToken')
  // const isUserRequest = useSelector(state => state.auth.request)
  const user = useSelector(state => state.user.data)
  const isAuth = (Object.keys(user).length !== 0)

  // if (isUserRequest) {
  //   return null
  // }

  return isAuth ? <Navigate replace to={state?.from.pathname || '/'} /> : <Outlet />
}

export default ProtectedAuthRoute
