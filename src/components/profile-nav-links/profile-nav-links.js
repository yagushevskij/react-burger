import styles from './profile-nav-links.module.css'
import {NavLink} from 'react-router-dom'

const navLinkStyle = ({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive && styles.link_active}`

const ProfileNavLinks = () => {
  return (
    <div className={styles.container}>
    <nav className={`${styles.nav} mt-30`}>
      <NavLink className={navLinkStyle} end to={`/profile`}>
        Профиль
      </NavLink>
      <NavLink className={navLinkStyle} end to={`/profile/orders`}>
        История заказов
      </NavLink>
      <NavLink className={navLinkStyle} end to={`/logout`}>
        Выход
      </NavLink>
    </nav>
    <p className={`text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете просмотреть свою историю заказов</p>
    </div>
  )
}

export default ProfileNavLinks
