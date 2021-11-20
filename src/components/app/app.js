import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound, IngredientDetailsPage } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { getItems } from '../../services/actions/thunk/ingredients'
import Logout from '../logout/logout'
import ProtectedAuthRoute from '../protected-auth-route'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  useEffect(() => {
    dispatch(getItems())
  })
  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
