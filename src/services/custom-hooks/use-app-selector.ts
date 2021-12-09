import { useSelector, TypedUseSelectorHook } from 'react-redux'
import type { TRootState } from '../../index'

const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export default useAppSelector
