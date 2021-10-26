import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import burgerIngridients from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from './ingredient-card/ingredient-card'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { getItems } from '../../services/actions/cart'
import { REMOVE_ITEM_DATA } from '../../services/actions/cart'

const getBoundingClientRectTop = elem => elem.current.getBoundingClientRect().top

const BurgerIngridients = React.memo(() => {
  const dispatch = useDispatch()
  const { items, currentItem } = useSelector(store => store.cart)

  const [activeTab, setActiveTab] = useState()
  const [state, setState] = useState({
    scrollContainerHeight: 0,
    isModalOpened: false
  })
  useEffect(() => {
    dispatch(getItems())
    setActiveTab(getClosestTab())
    setState({
      ...state,
      scrollContainerHeight: getScrollContainerHeight()
    })
  }, [])

  const scrollContainer = useRef()
  const tabs = useRef()
  const sauce = useRef()
  const main = useRef()
  const bun = useRef()

  const getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight
    const scrollContainerOffsetTop = scrollContainer.current.offsetTop
    return windowHeight - scrollContainerOffsetTop
  }
  const getGrouppedIngredients = () => {
    const filterArr = good => items.filter(el => el.type === good)
    const mainArr = filterArr('main')
    const sauceArr = filterArr('sauce')
    const bunArr = filterArr('bun')
    return [
      { title: 'Булки', elems: bunArr, ref: bun, type: 'bun' },
      { title: 'Соусы', elems: sauceArr, ref: sauce, type: 'sauce' },
      { title: 'Начинки', elems: mainArr, ref: main, type: 'main' }
    ]
  }

  const handleCloseModal = () => {
    dispatch({
      type: REMOVE_ITEM_DATA,
      item: currentItem
    })
    setState({
      ...state,
      isModalOpened: false
    })
  }

  const handleOpenModal = () => {
    setState({
      ...state,
      isModalOpened: true
    })
  }

  const getClosestTab = () => {
    const tabsOffsetTop = tabs.current.offsetTop
    const elems = [
      { type: 'bun', offsetTop: getBoundingClientRectTop(bun) },
      { type: 'sauce', offsetTop: getBoundingClientRectTop(sauce) },
      { type: 'main', offsetTop: getBoundingClientRectTop(main) }
    ]
    const closestElem = elems.sort((a, b) => Math.abs(tabsOffsetTop - a.offsetTop) - Math.abs(tabsOffsetTop - b.offsetTop))[0]
    return closestElem.type
  }

  const handleScroll = () => {
    setActiveTab(getClosestTab())
  }

  const modal = (
    <Modal title='Детали ингридиента' onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  )
  const grouppedIngredients = getGrouppedIngredients()
  return (
    <>
      {state.isModalOpened && modal}
      <section className={burgerIngridients.section}>
        <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
        <div className={`${burgerIngridients.tab} mt-5`} ref={tabs}>
          {grouppedIngredients.map((el, index) => (
            <Tab active={el.type === activeTab} key={index}>
              {el.title}
            </Tab>
          ))}
        </div>
        <div
          className={`${burgerIngridients.content} mt-10`}
          style={{ maxHeight: state.scrollContainerHeight }}
          ref={scrollContainer}
          onScroll={handleScroll}
        >
          {grouppedIngredients.map((group, index) => {
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
})

export default BurgerIngridients
