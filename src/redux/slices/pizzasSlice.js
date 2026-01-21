import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

// 17.1.0 Для вынесения логики запроса на сервер (также иногда называют "бизнес логика") для получения данных о пиццах мы применим асинхронный экшен (https://redux-toolkit.js.org/api/createAsyncThunk). При помощи этого экшена мы можем одновременно\асинхронно выполнять несколько разных действий. Например, это может быть удобно, если при запросе на сервер, у нас также запускалась функция показа загрузки, а также сохранения данных. И вместо того, чтобы делать три разных экшена и потом вызывать 3 dispatch функции, мы можем все эти действия объединить в асинхронном экшене.
// 17.1.1 Здесь мы в функции "createAsyncThunk", создающий такой экшен первым аргументом указываем "название слайса/экшен", по которому его потом можно будет найти (например в Dev Tools), и он же передаётся вниз в ключи extraReducers.
// 17.1.2 В "extraReducers" мы записываем более расширенные вещи, которые не попадают в обычные экшены и не просто как-то изменяют стейты, а например асинхронные экшены, специфичные типы экшена или какие-то ключи.
// (Go to [Home.jsx])
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (link) => {
    const {data} = await axios.get(link)
    return data
  },
)

// 17.2.1 Теперь для загрузки у нас будет отдельный стейт "status", благодаря которому будет по-разному реагировать UI.
export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    status: 'loading', // loading | success | error
    items: []
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  // 17.1.3 Здесь мы можем ка-то реагировать, в зависимости от того в каком статусе находится запрос на сервер.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        console.log('Pizzas are loading...')
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        console.log('Pizzas has been successfully loaded!')
        state.status = "success"
        state.items = action.payload
      })
      .addCase(fetchPizzas.rejected, (state) => {
        console.log('Something went wrong!')
        state.status = "error"
        state.items = []
      })
  }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer