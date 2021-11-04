import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import burgerIngridients from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import { getItems, SET_CURRENT_ITEM } from '../../services/actions/ingredients'
import { openModal } from '../../services/actions/modal'
import TabList from './tab-list/tab-list'

const getBoundingClientRectTop = elem => elem.current.getBoundingClientRect().top

const BurgerIngridients = () => {
  const scrollContainerRef = useRef()
  const tabsRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()
  const bunRef = useRef()

  const getGrouppedIngredients = items => {
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

  const dispatch = useDispatch()
  const wasModalClosed = useSelector(store => store.modal.wasClosed)
  const ingredients = useSelector(store => getGrouppedIngredients(store.ingredients.items))

  const [activeTab, setActiveTab] = useState()
  const [scrollContainer, setSrollContainer] = useState({ height: 0 })

  useEffect(() => {
    dispatch(getItems())
    setActiveTab(getClosestTab())
    setSrollContainer({ height: getScrollContainerHeight() })
  }, [])
  useEffect(() => {
    if (wasModalClosed) {
      dispatch({
        type: SET_CURRENT_ITEM,
        payload: { item: null }
      })
    }
  }, [wasModalClosed, dispatch])

  const getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight
    const scrollContainerOffsetTop = scrollContainerRef.current.offsetTop
    return windowHeight - scrollContainerOffsetTop
  }

  const handleOpenModal = () => {
    dispatch(openModal({ title: 'Детали ингридиента' }))
  }

  const getClosestTab = () => {
    const tabsOffsetTop = tabsRef.current.offsetTop
    const closestElem = ingredients.sort((a, b) => Math.abs(tabsOffsetTop - getBoundingClientRectTop(a.ref)) - Math.abs(tabsOffsetTop - getBoundingClientRectTop(b.ref)))[0]
    return closestElem.type
  }

  const handleScroll = () => {
    setActiveTab(getClosestTab())
  }
  return (
    <>
      <section className={burgerIngridients.section}>
        <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
        <TabList items={ingredients} activeTab={activeTab} ref={tabsRef} />
        <div className={`${burgerIngridients.content} mt-10`} style={{ maxHeight: scrollContainer.height }} ref={scrollContainerRef} onScroll={handleScroll}>
          {ingredients.map((group, index) => {
            return (
              <div key={index}>
                <h2 className='text text_type_main-medium' ref={group.ref}>
                  {group.title}
                </h2>
                <div className={`${burgerIngridients.cards} pt-6 pb-10 pl-4 pr-4`}>
                  {group.elems.map((card, i) => (
                    <IngredientCard data={card} key={i} openModal={handleOpenModal} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default BurgerIngridients
