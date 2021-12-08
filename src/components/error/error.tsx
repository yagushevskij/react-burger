import { useLocation } from 'react-router'
import { FC } from 'react'

const defaultMessage = 'Возникла ошибка'

const Error: FC = () => {
  const location = useLocation()
  const message = location.state.message
  return <h1 className={`text text_type_main-medium`}>{message || defaultMessage}</h1>
}

export default Error
