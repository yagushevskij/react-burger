import React from 'react'
import appHeader from './app-header.module.css'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const AppHeader = () => {
  const [activeIcon, setActiveIcon] = useState()
  const setLinkStyle = (isActive, link) => {
    if (isActive) {
      setActiveIcon(link)
    }
    return `${appHeader.link} text text_type_main-default text_color_inactive ml-2 ${isActive && appHeader.link_active}`
  }
  const primaryIcon = 'primary'
  const secondaryIcon = 'secondary'
  return (
    <header className={appHeader.header}>
      <div className={appHeader.header__wrapper}>
        <ul className={`${appHeader.item} ${appHeader.item_pos_left}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <BurgerIcon type={activeIcon === 'constructor' ? primaryIcon : secondaryIcon} />
            <NavLink end to={`/`} className={({ isActive }) => setLinkStyle(isActive, 'constructor')}>
              Конструктор
            </NavLink>
          </li>
          <li className={`${appHeader.item__link} p-5 ml-2`}>
            <ListIcon type={activeIcon === 'orders' ? primaryIcon : secondaryIcon} />
            <NavLink end to={`/profile/orders`} className={({ isActive }) => setLinkStyle(isActive, 'orders')}>
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={`${appHeader.logo} ${appHeader.item}`}>
          <Logo />
        </div>
        <ul className={`${appHeader.item} ${appHeader.item_pos_right}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <ProfileIcon type={activeIcon === 'profile' ? primaryIcon : secondaryIcon} />
            <NavLink end to={`/profile`} className={({ isActive }) => setLinkStyle(isActive, 'profile')}>
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default React.memo(AppHeader)
