import { useState, useRef, useEffect, useCallback, FC } from 'react'
import burgerIngridients from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import TabList from './tab-list/tab-list'
import type { IMainCardType } from '../../utils/types'
import { useAppSelector } from '../../services/custom-hooks/redux-hooks'
import useContainerHeight from '../../services/custom-hooks/use-container-height'

export type TIngredients = 'bun' | 'sauce' | 'main' | undefined
type TGetClosestTabCallback = () => TIngredients | null
export type TGrouppedIngredients = { title: string; elems: IMainCardType[]; ref: React.RefObject<HTMLDivElement>; type: TIngredients }[]

const getBoundingClientRectTop = (elem: React.RefObject<HTMLDivElement>): any => elem.current?.getBoundingClientRect().top

const BurgerIngridients: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLDivElement>(null)

  const createGrouppedIngredients = (items: IMainCardType[]): TGrouppedIngredients => {
    const filterArr = (good: string) => items.filter(el => el.type === good)
    const mainArr = filterArr('main')
    const sauceArr = filterArr('sauce')
    const bunArr = filterArr('bun')
    return [
      { title: 'Булки', elems: bunArr, ref: bunRef, type: 'bun' },
      { title: 'Соусы', elems: sauceArr, ref: sauceRef, type: 'sauce' },
      { title: 'Начинки', elems: mainArr, ref: mainRef, type: 'main' },
    ]
  }

  const ingredients = useAppSelector(store => createGrouppedIngredients(store.ingredients.items))

  const [activeTab, setActiveTab] = useState<TIngredients | null>()
  const [containerHeight] = useContainerHeight(scrollContainerRef)

  const getClosestTab = useCallback<TGetClosestTabCallback>(() => {
    const tabsOffsetTop = tabsRef.current?.offsetTop
    if (tabsOffsetTop) {
      const closestElem = ingredients.sort(
        (a, b) => Math.abs(tabsOffsetTop - getBoundingClientRectTop(a.ref)) - Math.abs(tabsOffsetTop - getBoundingClientRectTop(b.ref)),
      )[0]
      return closestElem.type
    }
    return null
  }, [ingredients])

  useEffect(() => {
    setActiveTab(getClosestTab())
  }, [getClosestTab])

  return (
    <section className={burgerIngridients.section}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <TabList items={ingredients} activeTab={activeTab} ref={tabsRef} />
      <div
        className={`${burgerIngridients.content} mt-10`}
        style={{ maxHeight: containerHeight }}
        ref={scrollContainerRef}
        onScroll={() => setActiveTab(getClosestTab())}
      >
        {ingredients.map((group, index) => {
          return (
            <div key={index}>
              <h2 className="text text_type_main-medium" ref={group.ref}>
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
