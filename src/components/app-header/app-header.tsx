import React, { FC } from 'react'
import appHeader from './app-header.module.css'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Link, useLocation } from 'react-router-dom'

const links = {
  constructor: {
    title: 'Конструктор',
    path: '/'
  },
  ordersFeed: {
    title: 'Лента заказов',
    path: '/feed'
  },
  profile: {
    title: 'Личный кабинет',
    path: '/profile'
  }
}

enum IconsType {
  primary = 'primary',
  secondary = 'secondary'
}


const AppHeader: FC = () => {
  const location = useLocation()
  const getLinkStyle = ({isActive}: {isActive: {}}): string => `${appHeader.link} text text_type_main-default text_color_inactive ml-2 ${isActive && appHeader.link_active}`
  const getActiveIcon = (path: string): IconsType.primary | IconsType.secondary  => (location.pathname === path ? IconsType.primary : IconsType.secondary)
  return (
    <header className={appHeader.header}>
      <div className={appHeader.header__wrapper}>
        <ul className={`${appHeader.item} ${appHeader.item_pos_left}`}>
          <li className={`${appHeader.item__link} pt-5 pr-5 pb-5`}>
            <BurgerIcon type={getActiveIcon(links.constructor.path)} />
            <NavLink end to={`/`} className={getLinkStyle}>
              {links.constructor.title}
            </NavLink>
          </li>
          <li className={`${appHeader.item__link} p-5 ml-2`}>
            <ListIcon type={getActiveIcon(links.ordersFeed.path)} />
            <NavLink end to={`/feed`} className={getLinkStyle}>
              {links.ordersFeed.title}
            </NavLink>
          </li>
        </ul>
        <Link className={`${appHeader.logo} ${appHeader.item}`} to={`/`}>
          <Logo />
        </Link>
        <ul className={`${appHeader.item} ${appHeader.item_pos_right}`}>
          <li className={`${appHeader.item__link} pt-5 pl-5 pb-5`}>
            <ProfileIcon type={getActiveIcon(links.profile.path)} />
            <NavLink end to={`/profile`} className={getLinkStyle}>
              {links.profile.title}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default React.memo(AppHeader)
