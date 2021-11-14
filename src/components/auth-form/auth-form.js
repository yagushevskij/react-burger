import styles from './auth-form.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'


const AuthForm = ({title, buttonText, children, onSubmit }) => {
  const isRequest = useSelector(state => state.auth.request)

  return (
    <>
    {title && <h1 className={styles.title}>{title}</h1>}
    <form className={`${styles.form} mt-6`} onSubmit={event => onSubmit(event)}>
      <div className={styles.inputs}>
        {children}
      </div>
      <div className='mt-6'>
        <Button type='primary' size='medium' disabled={isRequest}>
          {buttonText}
        </Button>
      </div>
    </form>
    </>
  )
}

export default AuthForm