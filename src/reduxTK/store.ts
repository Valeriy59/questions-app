import { configureStore } from '@reduxjs/toolkit'
import {questionsSlice} from "./questionsSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
// ...
export const store = configureStore({
  reducer: {
    questions: questionsSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store