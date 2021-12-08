import { Navigate } from 'react-router'
import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/actions/thunk/auth'

const Logout: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return <Navigate to={`/`} />
}

export default Logout
