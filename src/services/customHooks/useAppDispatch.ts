import { useDispatch } from 'react-redux'
import type { TAppDispatch } from '../../index'

const useAppDispatch = () => useDispatch<TAppDispatch>()

export default useAppDispatch