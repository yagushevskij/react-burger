import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import burgerIngridients from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import TabList from './tab-list/tab-list'

const getBoundingClientRectTop = elem => elem.current.getBoundingClientRect().top

const BurgerIngridients = () => {
  const scrollContainerRef = useRef()
  const tabsRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()
  const bunRef = useRef()

  const createGrouppedIngredients = items => {
    const filterArr = good => items.filter(el => el.type === good)
    const mainArr = filterArr('main')
    const sauceArr = filterArr('sauce')
    const bunArr = filterArr('bun')
    return [
      { title: 'Булки', elems: bunArr, ref: bunRef, type: 'bun' },
      { title: 'Соусы', elems: sauceArr, ref: sauceRef, type: 'sauce' },
      { title: 'Начинки', elems: mainArr, ref: mainRef, type: 'main' }
    ]
  }

  const ingredients = useSelector(store => createGrouppedIngredients(store.ingredients.items))

  const [activeTab, setActiveTab] = useState()
  const [scrollContainer, setSrollContainer] = useState({ height: 0 })

  const getClosestTab = useCallback(() => {
    const tabsOffsetTop = tabsRef.current.offsetTop
    const closestElem = ingredients.sort((a, b) => Math.abs(tabsOffsetTop - getBoundingClientRectTop(a.ref)) - Math.abs(tabsOffsetTop - getBoundingClientRectTop(b.ref)))[0]
    return closestElem.type
  }, [ingredients])

  useEffect(() => {
    setActiveTab(getClosestTab())
  }, [getClosestTab])
  useEffect(() => {
    setSrollContainer({ height: getScrollContainerHeight() })
  }, [])

  const getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight
    const scrollContainerOffsetTop = scrollContainerRef.current.offsetTop
    return windowHeight - scrollContainerOffsetTop
  }

  return (
    <section className={burgerIngridients.section}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <TabList items={ingredients} activeTab={activeTab} ref={tabsRef} />
      <div className={`${burgerIngridients.content} mt-10`} style={{ maxHeight: scrollContainer.height }} ref={scrollContainerRef} onScroll={() => setActiveTab(getClosestTab())}>
        {ingredients.map((group, index) => {
          return (
            <div key={index}>
              <h2 className='text text_type_main-medium' ref={group.ref}>
                {group.title}
              </h2>
              <div className={`${burgerIngridients.cards} pt-6 pb-10 pl-4 pr-4`}>
                {group.elems.map((card, i) => (
                  <IngredientCard data={card} key={i} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BurgerIngridients
