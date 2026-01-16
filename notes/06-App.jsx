import '/src/assets/fonts/proxima-nova-regular.eot'
import '/src/assets/fonts/proxima-nova-regular.woff2'
import '/src/assets/fonts/proxima-nova-regular.woff'
import '/src/assets/fonts/proxima-nova-regular.ttf'
import '/src/assets/fonts/proxima-nova-extrabold.eot'
import '/src/assets/fonts/proxima-nova-extrabold.woff2'
import '/src/assets/fonts/proxima-nova-extrabold.woff'
import '/src/assets/fonts/proxima-nova-extrabold.ttf'
import '/src/assets/fonts/proxima-nova-black.eot'
import '/src/assets/fonts/proxima-nova-black.woff2'
import '/src/assets/fonts/proxima-nova-black.woff'
import '/src/assets/fonts/proxima-nova-black.ttf'
import '/src/assets/fonts/proxima-nova-bold.eot'
import '/src/assets/fonts/proxima-nova-bold.woff2'
import '/src/assets/fonts/proxima-nova-bold.woff'
import '/src/assets/fonts/proxima-nova-bold.ttf'
import '/src/scss/app.scss'
import React from "react"
import {Route, Routes} from "react-router"
import Home from "/src/pages/Home.jsx"
import {Cart} from "/src/pages/Cart.jsx"
import {Page404} from "/src/pages/404.jsx"
import Header from "/src/components/Header.jsx"

// 12.8.0 Теперь мы добавим из библиотеки Redux хуки "useSelector" & "useDispatch", а также методы из слайса "increment" & "decrement". "useSelector" чем-то напоминает хук "useContext", он извлекает данные, в то время, как "useDispatch" используется для вызова специального метода-обёртки для методов из хранилища, чтобы можно было их использовать.
import {useDispatch, useSelector} from "react-redux"
import {increment, decrement} from "/src/redux/slices/filterSlice.js";

export const SearchContext = React.createContext()

export default function App() {
  const [searchValue, setSearchValue] = React.useState('')

  // 12.8.1 Также мы добавляем их здесь.
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
        {/* 12.8.2 Мы также добавим в вёрстку пару кнопок для тестов с инкрементом и декрементом стейта. Т.е. получается след. схема: Мы создаём и экспортируем методы в файле слайса, а потом применяем их через "dispatch" в вёрстке, как например "increment" & "decrement". */}
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
        {/*<Header/>
        <div className="content">
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>*/}
      </div>
    </SearchContext.Provider>
  )
}