import { createSlice } from '@reduxjs/toolkit'

// 12.4 Дальше мы создаём "слайсы" — это своего рода разделение хранилища на тематические секции, например у нас будет пока три вида "слайса": 1) для фильтрации пицц; 2) для самих пицц; 3) для корзины выбранных товаров. Однако для начала рассмотрим работу слайсов на примере счётчика из документации "counterSlice".
// 12.5 Итак, рассмотрим что в нём есть: name - название слайса, initialState - начальное значение стейта при инициализации. А также в нём есть три метода "increment", "decrement" & "incrementByAmount".
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 12.6 Здесь мы экспортируем методы этого слайса.
// (Go to [store.ts])
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer