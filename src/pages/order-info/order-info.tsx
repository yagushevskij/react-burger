import { useParams } from "react-router"
import styles from './order-info.module.css'
import { OrderInfo as OrderInfoComponent } from "../../components/order-info/order-info"
import { useAppSelector } from "../../services/custom-hooks/redux-hooks"
import type { IMainCardType } from "../../utils/types"
import Modal from "../../components/modal/modal"
import { useEffect, useState, FC } from "react"

interface IOrderInfoProps {
  readonly type: 'user' | 'all'
}

export const costErrorText = 'нужно уточнить'

const OrderInfo: FC<IOrderInfoProps> = ({type}) => {
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()
  const userOrders = useAppSelector(state => state.orders.data)
  const orders = (type === 'user') ? userOrders : userOrders
  const order = orders.find(el => el._id === id)

  const ingredients = useAppSelector(state => state.ingredients.items)
  const orderIngredients = order?.ingredients.map(id => {
    return ingredients.find(el => el._id === id)
  }) as IMainCardType[]

  const totalCost = (orderIngredients) ? orderIngredients.reduce((acc, item) => acc + item!.price, 0) : costErrorText

  const handleCloseErrorModal = () => setError(null)

  useEffect(() => {
    const errorMessage = order ? null : 'Заказ с таким номером не найден'
    setError(errorMessage)
  }, [order])

  return (
    <>
      {error && 
      <Modal title={error} handleClose={handleCloseErrorModal}></Modal>}
         <section className={`${styles.container} mt-30`}>
          {order && <OrderInfoComponent order={order} ingredients={orderIngredients} totalCost={totalCost} />}
        </section>
    </>
  )
}

export default OrderInfo