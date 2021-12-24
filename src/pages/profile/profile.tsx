import styles from './profile.module.css'
import ProfileForm from '../../components/forms/profile-form/profile-form'
import ProfileNavLinks from '../../components/profile-nav-links/profile-nav-links'
import { useLocation } from 'react-router-dom'
import Orders from '../../components/orders/orders'
import { FC, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../services/custom-hooks/redux-hooks'
import { WS_CONNECTION_START } from '../../services/actions/orders-user'

const Profile: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.ordersUser.data)
  
  useEffect(() => {
    dispatch({type: WS_CONNECTION_START})
  })

  return (
    <main className={`${styles.main}`}>
      <ProfileNavLinks />
      {location.pathname === '/profile' && <ProfileForm />}
      {location.pathname.includes('/profile/orders') && (
        <div className='mt-10 ml-15'>
          <Orders data={orders} />
        </div>
      )}
    </main>
  )
}

export default Profile
