import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { getItems } from '../../services/actions/thunk/ingredients'
import Logout from '../logout/logout'
import ProtectedAuthRoute from '../protected-auth-route'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetailsModal from '../order-details-modal/order-details-modal'

const WrappedRoutes = () => {
  const location = useLocation()
  const background = location.state?.background

  return (
    <>
      <Routes location={background ?? location}>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
      <Routes>
      {background && <Route path='/ingredients/:id' element={<Modal title='Детали ингридиента'><IngredientDetails /></Modal>} />}
      {background && <Route path='/order' element={<OrderDetailsModal />} />}
      </Routes>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getItems())
  }, [dispatch])

  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <WrappedRoutes />
      </Router>
    </ErrorBoundary>
  )
}

export default App
