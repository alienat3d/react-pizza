import {createSlice} from '@reduxjs/toolkit'

// 13.0.0 Итак, повторяем тему React Redux, но уже на нашем проекте. У нас задача перевести его с рельс React Context на React Redux. Мы создадим первый слайс для фильтрации пицц, где нам нужно указать "name" - название слайса для нахождения Реактом методов, который принадлежат этому слайсу. Также у нас здесь "initialState" - изначальное значение стейта. А также у нас будут тут методы (или экшены) внутри "reducers".
// 13.0.1 Первый метод будет записи в стейт типа сортировки "setCategoryName". Мы запишем стейт, который хотим поменять через "state.categoryName" и поместим в него новое значение через "action.payload".
export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryName: 'all',
    sortingTypeId: 0,
    sortingDirection: 'asc'
  },
  reducers: {
    // setCategoryName: () => {} - кстати, мы можем записывать редьюсеры короче:
    setCategoryName(state, action) {
      state.categoryName = action.payload
    },
    setSortingTypeId(state, action) {
      state.sortingTypeId = action.payload
    },
    setSortingDirection(state, action) {
      state.sortingDirection = action.payload
    }
  },
})

// 13.0.2 Экспортируем экшены через деструктурирование, чтобы можно было использовать каждый из них в других частях приложения.
export const {setCategoryName, setSortingTypeId, setSortingDirection} = filterSlice.actions

// 13.0.3 А по умолчанию экспортируем редьюсер.
// (Go to [/redux/store.js])
export default filterSlice.reducer