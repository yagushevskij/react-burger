import { Navigate } from 'react-router'
import { useEffect, FC } from 'react'
import { useAppDispatch } from '../../services/custom-hooks/redux-hooks'

import { logout } from '../../services/actions/thunk/auth'

const Logout: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return <Navigate to={`/`} />
}

export default Logout
