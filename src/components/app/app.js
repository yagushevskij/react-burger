import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages'
import AppHeader from '../app-header/app-header'

const App = () => {
  return (
    <ErrorBoundary>
      <AppHeader />
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<ProtectedRoute />}> */}
            <Route path='/profile' element={<Profile />} />
          {/* </Route> */}
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
