import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../utils/helpers'
import { useEffect } from 'react'
import { getUser } from '../services/actions/thunk/user'

const ProtectedRoute = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //       dispatch(getUser())
  // })
  // const accessToken = getCookie('accessToken')
  const isUserRequest = useSelector(state => state.auth.request)
  const user = useSelector(state => state.user.data)
  const location = useLocation()

  console.log({isUserRequest})

  if (isUserRequest) {
    return null
  }

  return user ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
