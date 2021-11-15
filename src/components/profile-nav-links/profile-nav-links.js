import styles from './profile-nav-links.module.css'
import {NavLink} from 'react-router-dom'

const navLinkStyle = ({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive && styles.link_active}`

const ProfileNavLinks = () => {
  return (
    <nav className={styles.nav}>
      <NavLink className={navLinkStyle} to={`/profile`}>
        Профиль
      </NavLink>
      <NavLink className={navLinkStyle} to={`/profile/orders`}>
        История заказов
      </NavLink>
      <NavLink className={navLinkStyle} to={`/logout`}>
        Выход
      </NavLink>
    </nav>
  )
}

export default ProfileNavLinks
