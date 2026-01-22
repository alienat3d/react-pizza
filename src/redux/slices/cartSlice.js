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
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      findItem ? findItem.amount++ : state.items.push(action.payload)

      state.totalItems++
      state.totalPrice = state.items.reduce((total, obj) => total + (obj.price * obj.amount), 0)
    },
    removeItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem.amount > 1) {
        findItem.amount--
      } else {
        if (window.confirm('Вы действительно хотите удалить этот товар?')) {
          state.items = state.items.filter(obj => obj.id !== action.payload)
        }
      }

      if (state.totalItems > 0) state.totalItems--
      state.totalPrice = state.items.reduce((total, obj) => total + (obj.price * obj.amount), 0)
    },
    removeItems(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      state.totalItems = state.totalItems - findItem.amount
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((total, obj) => total + (obj.price * obj.amount), 0)
    },
    clearList(state) {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
})

// ? 18.1.0 Если у нас в приложении много повторений useSelector одного и того, то мы можем создать специальную функцию, которая будет хранить этот useSelector:
// (Go to [Header.jsx])
export const selectCart = state => state.cart
// 18.2.0 Мы также можем делать подобные селекторы, если нам нужно (но в этом случае это уже будет функция, принимающая в себя параметр id и которая возвращает другую функцию):
// (Go to [PizzaBlock/index.jsx])
export const selectCartItemById = id => state => state.cart.items.find(obj => obj.id === id)

export const {addItem, removeItem, removeItems, clearList} = cartSlice.actions

export default cartSlice.reducer