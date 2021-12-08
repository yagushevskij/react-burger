import styles from './not-found.module.css'
import { FC } from 'react'

const NotFound: FC = () => {
  return (
    <section className={`${styles.main}`}>
      <h1 className={`text text_type_main-medium`}>Запрашиваемая страница не найдена</h1>
    </section>
  )
}

export default NotFound
