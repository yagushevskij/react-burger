import React, { FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabList from './tab-list.module.css'
import type { TIngredients } from '../burger-ingredients'
import type { TGrouppedIngredients } from '../burger-ingredients'

type TTabList = {
  items: TGrouppedIngredients;
  activeTab: TIngredients | null;
}

const TabList = React.forwardRef<HTMLDivElement, TTabList>((props, ref) => {
  const { items, activeTab } = props
  return (
    <div className={`${tabList.tab} mt-5`} ref={ref}>
      {items.map((el, index) => (
        <Tab active={el.type === activeTab} key={index} value={''} onClick={() => {}}>
          {el.title}
        </Tab>
      ))}
    </div>
  )
})

export default React.memo(TabList, (prevProps, nextProps) => prevProps.activeTab === nextProps.activeTab)
