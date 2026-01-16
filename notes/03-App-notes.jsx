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
import React from "react";
import {Route, Routes} from "react-router";
import Home from "/src/pages/Home.jsx";
import {Cart} from "/src/pages/Cart.jsx";
import {Page404} from "/src/pages/404.jsx";
import Header from "/src/components/Header.jsx"
// 10.0 React context (https://react.dev/learn/passing-data-deeply-with-context). Мы используем React context, когда нам нужно, как в случае с поиском, прокинуть данные через несколько компонентом (т.е. не от родительского к дочернему, а глубже или выше)
// 11.0 Для создания Реакт контекста мы создадим константу SearchContext
// 11.2.5.1 ... для этого мы допишем слово "export" у константы, которой присвоено выполнение функции React.createContext() ↓
export const SearchContext = React.createContext()

export default function App() {
  // 10.1.0 Сначала создадим стейт для поиска.
  const [searchValue, setSearchValue] = React.useState('')

  // 10.4 Но такое прокидывание данных через несколько компонентов и их пропсы (называется также "props drilling") приемлемо только для второго, максимум 3-его уровня, но когда так приходится делать на более глубокие уровни для более сложных веб-приложений — так делать нельзя и это считается плохой стилистикой кода. Для таких случаев у нас и есть React context. ↓
  // 11.1 Теперь, когда мы используем Реакт контекст мы можем обернуть все компоненты в "SearchContext.Provider", т.о. они все будут иметь доступ к данным в этом контексте, если понадобится. В атрибут value мы передадим стейт searchValue и функцию сохранения этого стейта, т.к. нам нужно перекинуть их в комп. 09-Search.
  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
        {/* 10.1.1 Далее нам нужно прокинуть и сам стейт и запись стейта в комп. Header. */}
        {/* (go to [Header.jsx]) */}
        {/* 11.2.0 Теперь можно здесь убрать пропсы для стейта и записи стейта searchValue. */}
        {/*<Header searchValue={searchValue} setSearchValue={setSearchValue}/>*/}
        {/* (Go to [Header.jsx]) */}
        <Header/>
        <div className="content">
          {/* 7.4.1 Далее в этом компоненте нам нужно в общий неизменяемый контейнер добавить Routes и Route, для каждого из возможных путей сайта. Вначале у нас будет идти путь к главной странице, а в конце к 404-ой странице. */}
          {/* (go to [Header.jsx]) */}
          <Routes>
            {/* 10.5 Итак, мы прокидываем в Home стейт "searchValue". */}
            {/* (Go to [Home]) */}
            {/* 11.2.6 Теперь можно и здесь "searchValue" убрать. */}
            {/*Атрибут "index" определяет главную страницу сайта*/}
            {/*<Route index element={<Home searchValue={searchValue}/>}/>*/}
            <Route index element={<Home/>}/>
            <Route path="cart" element={<Cart/>}/>
            {/*Последним записывается рут к странице 404*/}
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  )
}