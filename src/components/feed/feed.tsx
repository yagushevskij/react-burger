import styles from './feed.module.css'
import { FC } from 'react'

const Feed: FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.columns}>
        <div className={styles.wrapper}>
          <p className='text text_type_main-medium pb-6'>Готовы:</p>
          <ul className={`${styles.orders} ${styles.orders_ready}`}>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
          </ul>
        </div>
        <div className={styles.wrapper}>
          <p className='text text_type_main-medium pb-6'>В работе:</p>
          <ul className={`${styles.orders}`}>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
            <li className={`${styles.orders__item_ready} text text_type_digits-default`}>42353465</li>
          </ul>
        </div>
      </div>
      <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
      <p className={`${styles.digit} text text_type_digits-large`}>28 752</p>
      <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
      <p className={`${styles.digit} text text_type_digits-large`}>138</p>
    </section>
  )
}

export default Feed
