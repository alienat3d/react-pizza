import {createSlice} from '@reduxjs/toolkit'

// 16.1 Теперь поработаем с корзиной товаров, создадим отдельный слайс, куда будем сохранять её содержимое. Внутри будет массив для добавленных в корзину пицц, а также общая цена. Добавим экшены для добавления новых артиклей, удаления их, а также очистки массива с ними.
// (Go to [Header.jsx])
// 16.4 Теперь для расчёта итоговой суммы нам нужно в экшене добавления также менять стейт totalPrice, вычисляя общую сумму, с помощью "reduce".
// 16.5 Отлично, у нас добавляются пиццы в хранилище Redux, но нам нужно это немного оптимизировать, чтобы не добавлялось слишком много лишней информации, когда, например у нас добавляют пиццы с одинаковыми параметрами. Когда мы будем добавлять пиццу в корзину, то мы будем добавлять вместе к этому товару свойство "amount". Затем, при добавлении ещё одной такой же пиццы мы будем уже увеличивать у неё на 1 значение свойства "amount". Для этого чуть перепишем экшен "addItem". Мы будем искать по id с помощью метода "filter" добавляемую пиццу в массиве добавленных пицц, и если такая найдётся, то мы будем увеличивать её свойство "amount" на 1, вместо добавления ещё одного такого же объекта в массив.
// (Go to [/PizzaBlock/index.jsx])
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalItems: 0,
    totalPrice: 0,
    items: [],
  },
  reducers: {
    /*addItem(state, action) {
      state.items.push(action.payload)
      state.totalPrice = state.items.reduce((total, obj) => total + obj.price, 0)
    },*/
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.amount++
        findItem.price = findItem.price * findItem.amount
      } else {
        state.items.push(action.payload)
      }

      state.totalItems++
      state.totalPrice = state.items.reduce((total, obj) => total + obj.price, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
    },
  },
})

export const {addItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer