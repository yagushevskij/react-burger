import { useDispatch } from 'react-redux'
import type { TAppDispatch } from '../../index'

export const useAppDispatch = () => useDispatch<TAppDispatch>()