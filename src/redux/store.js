import { configureStore } from '@reduxjs/toolkit'
import filter from '/src/redux/slices/filterSlice.js'
import search from '/src/redux/slices/searchSlice.js'
import cart from '/src/redux/slices/cartSlice.js'
import pizzas from '/src/redux/slices/pizzasSlice.js'

// 12.7 Дальше нам нужно добавить в хранилище наш counterSlice. Для этого в объект "reducer" мы помещаем "counterReducer" в свойство с именем слайса "counter".
// (Go to [App.jsx])
// 13.1 Здесь мы импортируем редьюсер слайса "filter" и добавляем его через его имя внутрь функции, создающей хранилище, "configureStore" в секцию "reducer".
// (Go to [Home.jsx])
export default configureStore({
  reducer: {
    // filter: filter, можно сократить до:
    filter, search, cart, pizzas
  },
})