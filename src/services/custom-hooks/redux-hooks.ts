import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import type { TRootState } from '../store'
import store from '../store'
import type { TAppThunk } from '../../utils/types'

export type TAppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
export const useAppDispatch = () => useDispatch<TAppDispatch | TAppThunk>()
