import { useState } from 'react'

export type TUseInput<T> = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  data: T
  resetInputedData: () => void
}

const useInput = <T>(initialData: T): TUseInput<T> => {
  const [data, setData] = useState<T>(initialData)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    onChange(name, value)
  }
  const onChange = (name: string, value: string | boolean) => setData({ ...data, [name]: value })
  const resetInputedData = () => {
    setData(initialData)
  }

  return { handleInputChange, data, resetInputedData }
}

export default useInput
