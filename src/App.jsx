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
import {Route, Routes} from "react-router";
import {Home} from "/src/pages/Home.jsx";
import {Cart} from "/src/pages/Cart.jsx";
import {Page404} from "/src/pages/404.jsx";
import Header from "/src/components/Header.jsx"

export default function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          {/* 7.4.1 Далее в этом компоненте нам нужно в общий неизменяемый контейнер добавить Routes и Route, для каждого из возможных путей сайта. Вначале у нас будет идти путь к главной странице, а в конце к 404-ой странице. */}
          {/* (go to [Header.jsx]) */}
          <Routes>
            {/*Атрибут "index" определяет главную страницу сайта*/}
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            {/*Последним записывается рут к странице 404*/}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}