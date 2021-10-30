import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabList from './tab-list.module.css'

const TabList = React.forwardRef(
  (props, ref) => {
    const { items, activeTab } = props
    return (
      <div className={`${tabList.tab} mt-5`} ref={ref}>
        {items.map((el, index) => (
          <Tab active={el.type === activeTab} key={index}>
            {el.title}
          </Tab>
        ))}
      </div>
    )
  }   
)

export default React.memo(TabList, (prevProps, nextProps) => prevProps.activeTab === nextProps.activeTab)
