import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import type { TRootState } from '../../index'
import type { TAppDispatch, TAppThunk } from '../../utils/types'

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
export const useAppDispatch = () => useDispatch<TAppDispatch | TAppThunk>()
