import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import search from './slices/searchSlice'
import cart from './slices/cartSlice'
import pizzas from './slices/pizzasSlice'

// 12.7 Дальше нам нужно добавить в хранилище наш counterSlice. Для этого в объект "reducer" мы помещаем "counterReducer" в свойство с именем слайса "counter".
// (Go to [App.tsx])
// 13.1 Здесь мы импортируем редьюсер слайса "filter" и добавляем его через его имя внутрь функции, создающей хранилище, "configureStore" в секцию "reducer".
// (Go to [Home.tsx])
export const store =  configureStore ({
  reducer: {
    // filter: filter, можно сократить до "filter"
    filter, search, cart, pizzas
  },
})

// 22.2 Здесь мы настроим RootState для работы с TypeScript:

// 1. Get the RootState type from the store itself
// This is the magic part: it automatically updates whenever you add a new slice!
export type RootState = ReturnType<typeof store.getState>

// 2. Get the Dispatch type
// This enables autocomplete for thunks and async actions
export type AppDispatch = typeof store.dispatch

// (Go to [hooks.ts])