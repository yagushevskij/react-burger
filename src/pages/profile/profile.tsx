import styles from './profile.module.css'
import ProfileForm from '../../components/forms/profile-form/profile-form'
import ProfileNavLinks from '../../components/profile-nav-links/profile-nav-links'
import { useLocation } from 'react-router-dom'
import Orders from '../../components/orders/orders'
import { FC } from 'react'
import { useAppSelector } from '../../services/custom-hooks/redux-hooks'

const Profile: FC = () => {
  const location = useLocation()
  const orders = useAppSelector(state => state.orders.data)

  return (
    <section className={`${styles.main}`}>
      <ProfileNavLinks />
      {location.pathname === '/profile' && <ProfileForm />}
      {location.pathname === '/profile/orders' && <Orders data={orders} />}
    </section>
  )
}

export default Profile
