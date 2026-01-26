// 22.3 Здесь мы пропишем свои специальные хуки, т.к. в отличие от ReactJS, в ReactTS мы не можем использовать useDispatch & useSelector напрямую, а если захотим, то нам придётся всюду прописывать "(state: RootState)", что не слишком удобно и продуцирует массу мусорного кода. Потому лучше создать хуки.
// (Go to [Home.tsx])
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use this instead of plain `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch

// Use this instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector