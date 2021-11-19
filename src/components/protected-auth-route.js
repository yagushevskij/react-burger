import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../utils/helpers'
import { useEffect } from 'react'
import { getUser } from '../services/actions/thunk/user'

const ProtectedAuthRoute = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //       dispatch(getUser())
  // })
  // const accessToken = getCookie('accessToken')
  // const isUserRequest = useSelector(state => state.auth.request)
  const user = useSelector(state => state.user.data)
  const isAuth = (Object.keys(user).length !== 0)
  // const location = useLocation()

  // if (isUserRequest) {
  //   return null
  // }

  return isAuth ? <Navigate replace to={'/'} /> : <Outlet />
}

export default ProtectedAuthRoute
