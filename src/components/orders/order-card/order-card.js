import styles from './order-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { getFormatedDay } from '../../../utils/helpers'

// const maxElems = 5
// let zIndex = 50

const OrderCard = ({ props }) => {
  const { createdAt, name, number, status, ingredients: ids } = props
  const ingredients = useSelector(state => state.ingredients.items)
  const isIngredientsExist = ingredients.length !== 0

  const getTotalPrice = () => {
    return ids.reduce((acc, id) => {
      const ingredient = ingredients.find(el => el._id === id)
      return acc + ingredient.price
    }, 0)
  }

  // const orderIcons = ids.map(id => {
  //   const ingredient = ingredients.find(el => el._id === id)
  //   return ingredient?.image_mobile
  // })

  if (!isIngredientsExist) return null

  return (
    <article className={styles.container}>
      <div className={styles.between}>
        <span className={`text text_type_digits-default`}>{number}</span>
        <span className={`text text_type_main-default text_color_inactive`}>{getFormatedDay(createdAt)}</span>
      </div>
      <p className={`text text_type_main-medium mt-5`}>{name}</p>
      <p className={`text text_type_main-default mt-2`}>{status}</p>
      <div className={`${styles.between} mt-7`}>
        <ul className={`${styles.icons}`}>
          {/* {orderIcons.map((el, i) => {
            zIndex = zIndex - 1
            if (i <= maxElems - 1) {
              return (
                <li className={styles.icon} style={{ zIndex }} key={i}>
                  <img className={styles.img} alt='' src={el} />
                </li>
              )
            } else if (i === maxElems) {
              const moreCount = orderIcons.length - maxElems
              return (
                <li className={styles.icon_last} key={i}>
                  <img className={styles.img} alt='' src={el} />
                  <span className={`${styles.more} text text_type_main-small`}>{`+${moreCount}`}</span>
                </li>
              )
            }
            return null
          })} */}
        </ul>
        <div className={styles.cost}>
          <span className={`mr-2`}>{getTotalPrice()}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  )
}

export default OrderCard
