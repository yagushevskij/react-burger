import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { useSelector } from 'react-redux'
import { getItems } from '../../services/actions/thunk/ingredients'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getItems())
  }, [])
  const {request: isUserRequest } = useSelector((state) => state.user)

  console.log(isUserRequest)

  if (isUserRequest) {
    return null
  }

  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
