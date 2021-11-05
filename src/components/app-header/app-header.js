import React from 'react'
import appHeader from './app-header.module.css'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <div className={appHeader.header__wrapper}>
        <ul className={`${appHeader.item} ${appHeader.item_pos_left}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <BurgerIcon type='primary' />
            <span className={`${appHeader.link} text text_type_main-default ml-2`}>Конструктор</span>
          </li>
          <li className={`${appHeader.item__link} p-5 ml-2`}>
            <ListIcon type='secondary' />
            <span className={`${appHeader.link} text text_type_main-default text_color_inactive ml-2`}>Лента заказов</span>
          </li>
        </ul>
        <div className={`${appHeader.logo} ${appHeader.item}`}>
          <Logo />
        </div>
        <ul className={`${appHeader.item} ${appHeader.item_pos_right}`}>
          <li className={`${appHeader.item__link} p-5`}>
            <ProfileIcon type='secondary' />
            <span className={`${appHeader.link} text text_type_main-default text_color_inactive ml-2`}>Личный кабинет</span>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default React.memo(AppHeader)
