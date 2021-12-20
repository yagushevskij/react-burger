import styles from './order-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getFormatedDay } from '../../../utils/helpers'
import { FC } from 'react'
import type { IOrder } from '../../../services/actions/orders'
import type {IMainCardType} from '../../../utils/types'

interface IOrderCard {
  readonly data: IOrder
  readonly ingredients: IMainCardType[]
}

enum orderStatus {
  created = 'Создан',
  pending = 'Готовится',
  done = 'Выполнен'
}

const maxIngredientIcons = 5 // Число показываемых иконок ингредиентов
let zIndex = 5000 // Максимальное значение zIndex для иконок ингредиентов

const OrderCard: FC<IOrderCard> = ({ data, ingredients }) => {
  const { createdAt, name, number, status, ingredients: ids } = data

  const orderIngredients = ids.map(id => {
        return ingredients.find(el => el._id === id)
      }) as IMainCardType[]

  const totalPrice = orderIngredients.reduce((acc, item) => acc + item?.price, 0)

  const iconsToRender = orderIngredients.map((el, i) => {
    zIndex = zIndex - 1
    if (i <= maxIngredientIcons - 1) {
      return (
        <li className={styles.icon} style={{ zIndex }} key={i}>
          <img className={styles.img} alt='' src={el.image_mobile} />
        </li>
      )
    } else if (i === maxIngredientIcons) {
      const moreCount = orderIngredients.length - maxIngredientIcons
      return (
        <li className={styles.icon_last} key={i}>
          <img className={styles.img} alt='' src={el.image_mobile} />
          <span className={`${styles.more} text text_type_main-small`}>{`+${moreCount}`}</span>
        </li>
      )
    }
    return null
  })

  return (
    <article className={styles.container}>
      <div className={styles.between}>
        <span className={`text text_type_digits-default`}>{`#${number}`}</span>
        <span className={`text text_type_main-default text_color_inactive`}>{getFormatedDay(createdAt)}</span>
      </div>
      <p className={`text text_type_main-medium mt-5`}>{name}</p>
      {status && <p className={`${styles[status]} text text_type_main-default mt-2`}>{orderStatus[status]}</p>}
      <div className={`${styles.between} mt-7`}>
        <ul className={`${styles.icons}`}>
          {iconsToRender}
        </ul>
        <div className={styles.cost}>
          <span className={`mr-2`}>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  )
}

export default OrderCard