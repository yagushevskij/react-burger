import styles from './profile.module.css'
import ProfileForm from '../../components/profile-form/profile-form'
import ProfileNavLinks from '../../components/profile-nav-links/profile-nav-links'
import { useLocation } from 'react-router-dom'
import Orders from '../../components/orders/orders'
import { FC } from 'react'

const Profile: FC = () => {
  const location = useLocation()

  return (
    <section className={`${styles.main}`}>
      <ProfileNavLinks />
      {location.pathname === '/profile' && <ProfileForm />}
      {location.pathname === '/profile/orders' && <Orders />}
    </section>
  )
}

export default Profile
