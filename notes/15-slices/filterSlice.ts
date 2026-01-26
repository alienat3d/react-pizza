import {createSlice} from '@reduxjs/toolkit'

// 13.0.0 Итак, повторяем тему React Redux, но уже на нашем проекте. У нас задача перевести его с рельс React Context на React Redux. Мы создадим первый слайс для фильтрации пицц, где нам нужно указать "name" - название слайса для нахождения Реактом методов, который принадлежат этому слайсу. Также у нас здесь "initialState" - изначальное значение стейта. А также у нас будут тут методы (или экшены) внутри "reducers".
// 13.0.1 Первый метод будет записи в стейт типа сортировки "setCategoryName". Мы запишем стейт, который хотим поменять через "state.categoryName" и поместим в него новое значение через "action.payload".
export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryName: 'all',
    currentPage: 1,
    sortingDirection: 'asc',
    sortingTypeId: 0,
  },
  reducers: {
    // setCategoryName: () => {} - кстати, мы можем записывать редьюсеры короче:
    setCategoryName(state, action) {
      state.categoryName = action.payload
    },
    setPageNumber(state, action) {
      state.currentPage = action.payload
    },
    setSortingDirection(state, action) {
      state.sortingDirection = action.payload
    },
    setSortingTypeId(state, action) {
      state.sortingTypeId = action.payload
    },
    // 15.5.1 Здесь нам понадобится отдельный экшен setFilters. Также сделаем и в [paginationSlice.js]
    // (Go to [Home.tsx])
    setFilters(state, action) {
      state.categoryName = action.payload.categoryName
      state.currentPage = Number(action.payload.currentPage)
      state.sortingTypeId = Number(action.payload.sortingTypeId)
      state.sortingDirection = action.payload.sortingDirection
    }
  },
})

// 13.0.2 Экспортируем экшены через деструктурирование, чтобы можно было использовать каждый из них в других частях приложения.
export const {setCategoryName, setPageNumber, setSortingDirection, setSortingTypeId, setFilters} = filterSlice.actions

// 13.0.3 А по умолчанию экспортируем редьюсер.
// (Go to [/redux/store.ts])
export default filterSlice.reducer