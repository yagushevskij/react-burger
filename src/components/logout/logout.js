import { Navigate } from 'react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/actions/thunk/auth'

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])


  return <Navigate to={`/login`} />
}

export default Logout
