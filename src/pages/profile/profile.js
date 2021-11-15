import styles from './profile.module.css'
import { useDispatch } from 'react-redux'
import { getUser } from '../../services/actions/thunk/user'
import { useEffect } from 'react'
import ProfileForm from '../../components/profile-form/profile-form'
import ProfileNavLinks from '../../components/profile-nav-links/profile-nav-links'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [])
  // console.log(Object.assign({}, data, inputedData ))
  return (
    <section className={`${styles.main} mt-30`}>
      <ProfileNavLinks />
      <ProfileForm />
    </section>
  )
}

export default Profile
