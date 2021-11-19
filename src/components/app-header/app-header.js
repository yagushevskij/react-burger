import React from 'react'
import appHeader from './app-header.module.css'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DATA } from '../../utils/config'

const links = DATA.header.links
const primaryIcon = 'primary'
const secondaryIcon = 'secondary'

const AppHeader = () => {
  const location = useLocation()
  // const [activeIcon, setActiveIcon] = useState()
  const setLinkStyle = ({isActive}) => `${appHeader.link} text text_type_main-default text_color_inactive ml-2 ${isActive && appHeader.link_active}`
  const setActiveIcon = (path) => location.pathname === path ? primaryIcon : secondaryIcon
  return (
    <header className={appHeader.header}>
      <div className={appHeader.header__wrapper}>
        <ul className={`${appHeader.item} ${appHeader.item_pos_left}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <BurgerIcon type={setActiveIcon(links.constructor.path)} />
            <NavLink end to={`/`} className={({ isActive }) => setLinkStyle(isActive, 'constructor')}>
              {links.constructor.title}
            </NavLink>
          </li>
          <li className={`${appHeader.item__link} p-5 ml-2`}>
            <ListIcon type={setActiveIcon(links.ordersFeed.path)} />
            <NavLink end to={`/profile/orders`} className={({ isActive }) => setLinkStyle(isActive, 'orders')}>
            {links.ordersFeed.title}
            </NavLink>
          </li>
        </ul>
        <div className={`${appHeader.logo} ${appHeader.item}`}>
          <Logo />
        </div>
        <ul className={`${appHeader.item} ${appHeader.item_pos_right}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <ProfileIcon type={setActiveIcon(links.profile.path)} />
            <NavLink end to={`/profile`} className={setLinkStyle}>
            {links.profile.title}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default React.memo(AppHeader)
