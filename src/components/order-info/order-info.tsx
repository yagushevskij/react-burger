import styles from './order-info.module.css'
import { FC } from 'react'
import type { IOrder } from '../../services/reducers/orders'
import type { IMainCardType } from '../../utils/types'
import { orderStatus } from '../../utils/config'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { costErrorText } from '../../pages/order-info/order-info'
import { getFormatedDay } from '../../utils/helpers'
import _ from 'lodash'

type IOrderData = Omit<IOrder, 'number'> & { number?: number }

interface IOrderInfo {
  readonly order: IOrderData | undefined
  readonly ingredients: IMainCardType[]
  readonly totalCost: number | typeof costErrorText
}

export const OrderInfo: FC<IOrderInfo> = ({ order, ingredients, totalCost }) => {
  const getUniqueAndCountedIngredients = (arr: IMainCardType[]) => {
    let result: IMainCardType[] = []
    arr.forEach(el => {
      const doublicate = result.find((x: IMainCardType) => x._id === el._id)
      if (doublicate) {
        doublicate.qty += 1
      } else {
        el.qty = 1
        result.push(el)
      }
    })
    return result
  }
  const ingrDeepCopy = _.cloneDeep(ingredients)
  const iniqueCountedIngredients = getUniqueAndCountedIngredients(ingrDeepCopy)
  const { createdAt, name, number, status } = order as IOrderData

  if (!order) return null
  return (
    <div className={styles.wrapper}>
      {number && <p className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>}
      <p className="text text_type_main-medium mt-10">{name}</p>
      <p className={`${styles[status]} text text_type_main-default mt-3`}>{orderStatus[status]}</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`${styles.scroll_container} mt-6`}>
        {iniqueCountedIngredients &&
          iniqueCountedIngredients.map((el: IMainCardType, i: number) => {
            return (
              <li className={`${styles.space_between} mt-4`} key={i}>
                <div className={styles.centered_line}>
                  <div className={styles.icon_container}>
                    <img className={styles.ingredient_icon} src={el.image_mobile} alt="" />
                  </div>
                  <p className={`text text_type_main-default ml-4`}>{el.name}</p>
                </div>
                <div className={`${styles.centered_line} pl-4 pr-4`}>
                  <p className="text text_type_digits-default mr-2">{el.qty}</p>
                  <p className="text text_type_main-default mr-2">X</p>
                  <p className="text text_type_digits-default mr-2">{el.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            )
          })}
      </ul>
      <div className={`${styles.space_between} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">{getFormatedDay(createdAt)}</p>
        <div className={styles.centered_line}>
          <p className="text text_type_digits-default mr-2">{totalCost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
