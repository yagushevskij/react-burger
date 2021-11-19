import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { useSelector } from 'react-redux'
import { getItems } from '../../services/actions/thunk/ingredients'
import Logout from '../logout/logout'
import ProtectedAuthRoute from '../protected-auth-route'
import { getCookie } from '../../utils/helpers'

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <AppWrap />
      </Router>
    </ErrorBoundary>
  )
}

const AppWrap = () => {
  const location = useLocation()
  const from = location.state?.from
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [])
  useEffect(() => {
    dispatch(getItems())
  })
  const { request: isUserRequest } = useSelector(state => state.auth)
  return (
    <Routes location={from ?? location}>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<ProtectedRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<Profile />} />
      </Route>
      <Route path='/logout' element={<ProtectedRoute />}>
        <Route path='/logout' element={<Logout />} />
      </Route>
      <Route path='/' element={<ProtectedAuthRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}

export default App
