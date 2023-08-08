// Documentation ftw
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

// Dont use `useDispatch` and `useSelector`, they're untyped
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSlector: TypedUseSelectorHook<RootState> = useSelector
