import styles from './auth-form.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, FormEvent } from 'react'

type TAuthFormProps = {
  title?: string
  buttonText?: string
  isButtonDisabled?: boolean
  onSubmit(event: FormEvent<HTMLFormElement>): void
}

const AuthForm: FC<TAuthFormProps> = ({ title, buttonText, isButtonDisabled, children, onSubmit }) => {
  return (
    <>
      {title && <h1 className={styles.title}>{title}</h1>}
      <form className={`${styles.form} mt-6`} onSubmit={event => onSubmit(event)}>
        <div className={styles.inputs}>{children}</div>
        <div className="mt-6">
          <Button type="primary" size="medium" disabled={isButtonDisabled}>
            {buttonText}
          </Button>
        </div>
      </form>
    </>
  )
}

export default AuthForm
