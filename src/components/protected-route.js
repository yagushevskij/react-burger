import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../utils/helpers'
import { useEffect } from 'react'
import { getUser } from '../services/actions/thunk/user'

const ProtectedRoute = () => {
  const refreshToken = getCookie('refreshToken')
  const isAuth = JSON.parse(getCookie('isAuth'))
  console.log({isAuth})
  // console.log({refreshToken})
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUser())
  // }, [])

  // const isUserRequest = useSelector(state => state.user.request)
  // const user = useSelector(state => state.user.data)
  const location = useLocation()
  
  // console.log({user, isUserRequest})

  // if (isUserRequest) {
  //   return null
  // }

  return isAuth ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location }} />
}

export default ProtectedRoute
