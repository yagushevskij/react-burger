import styles from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../services/actions/thunk/user'
import { useEffect } from 'react'
import ProfileForm from '../../components/profile-form/profile-form'
import ProfileNavLinks from '../../components/profile-nav-links/profile-nav-links'
import { useLocation, Navigate } from 'react-router-dom'
import Orders from '../../components/orders/orders'

const Profile = () => {
  const location = useLocation()
  // const isGetUserError = useSelector(state => state.user.failed)

  // if (isGetUserError) {
  //   return <Navigate to={'/login'} state={{ from: location }} />
  // }

  return (
    <section className={`${styles.main}`}>
      <ProfileNavLinks />
      {location.pathname === '/profile' && <ProfileForm />}
      {location.pathname === '/profile/orders' && <Orders />}
    </section>
  )
}

export default Profile