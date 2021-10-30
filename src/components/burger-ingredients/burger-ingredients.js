import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import burgerIngridients from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { getItems } from '../../services/actions/cart'
import { REMOVE_ITEM_DATA } from '../../services/actions/cart'
import TabList from './tab-list/tab-list'

const getBoundingClientRectTop = elem => elem.current.getBoundingClientRect().top

const BurgerIngridients = () => {
  const dispatch = useDispatch()
  const items = useSelector(store => store.cart.items)
  const currentItem = useSelector(store => store.cart.currentItem)

  const [activeTab, setActiveTab] = useState()
  const [scrollContainer, setSrollContainer] = useState({ height: 0 })
  const [modal, setModal] = useState({ isOpened: false })

  useEffect(() => {
    dispatch(getItems())
    setActiveTab(getClosestTab())
    setSrollContainer({ height: getScrollContainerHeight() })
  }, [])

  const scrollContainerRef = useRef()
  const tabsRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()
  const bunRef = useRef()

  const getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight
    const scrollContainerOffsetTop = scrollContainerRef.current.offsetTop
    return windowHeight - scrollContainerOffsetTop
  }
  const getGrouppedIngredients = () => {
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
  const grouppedIngredients = getGrouppedIngredients()

  const handleCloseModal = () => {
    dispatch({
      type: REMOVE_ITEM_DATA,
      item: currentItem
    })
    closeModal()
  }

  const closeModal = () => {
    setModal({ isOpened: false })
  }
  const openModal = useCallback(() => {
    setModal({ isOpened: true })
  }, [])

  const getClosestTab = () => {
    const tabsOffsetTop = tabsRef.current.offsetTop
    const closestElem = grouppedIngredients.sort((a, b) => Math.abs(tabsOffsetTop - getBoundingClientRectTop(a.ref)) - Math.abs(tabsOffsetTop - getBoundingClientRectTop(b.ref)))[0]
    return closestElem.type
  }

  const handleScroll = () => {
    setActiveTab(getClosestTab())
  }

  const modalElem = (
    <Modal title='Детали ингридиента' onCloseHandlers={[handleCloseModal]}>
      <IngredientDetails />
    </Modal>
  )
  return (
    <>
      {modal.isOpened && modalElem}
      <section className={burgerIngridients.section}>
        <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
        <TabList items={grouppedIngredients} activeTab={activeTab} ref={tabsRef} />
        <div className={`${burgerIngridients.content} mt-10`} style={{ maxHeight: scrollContainer.height }} ref={scrollContainerRef} onScroll={handleScroll}>
          {grouppedIngredients.map((group, index) => {
            return (
              <div key={index}>
                <h2 className='text text_type_main-medium' ref={group.ref}>
                  {group.title}
                </h2>
                <div className={`${burgerIngridients.cards} pt-6 pb-10 pl-4 pr-4`}>
                  {group.elems.map((card, i) => (
                    <IngredientCard data={card} key={i} openModal={openModal} />
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
