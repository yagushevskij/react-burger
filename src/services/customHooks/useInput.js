import { useState } from 'react'

const useInput = () => {
  const [data, setData] = useState({})
  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    onChange(name, value)
  }
  const onChange = (name, value) => setData({ ...data, [name]: value })
  const resetInputedData = () => {
    setData({})
  }

  return { handleInputChange, data, resetInputedData }
}

export default useInput
