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
import {lazy, Suspense} from "react"
import {Route, Routes} from "react-router"
import Home from "./pages/Home"
// import {Cart} from "./pages/Cart"
// import {Page404} from "./pages/404"
// import PizzaInfo from "./pages/PizzaInfo"
import Header from "./components/Header"

// 27.1.0 Помимо этого мы можем ещё динамически импортировать компоненты страниц, только тогда, когда пользователь захочет на них перейти. Для этого мы импортируем компонент в константу через коллбэк-функцию. ↓
// 27.2 Однако при создании "chunks" они будут создаваться с рандомизированными именами, что не всегда удобно, поэтому мы можем указать каждому из них название, с помощью комментария /* webpackChunkName: "chunkName" */
// ? 27.3 Вообще, такой вид загрузки рутов считается предпочтительным к использованию всегда ("best practice")
const Cart = lazy(() => import (/* webpackChunkName: "Cart" */"./pages/Cart"))
const Page404 = lazy(() => import (/* webpackChunkName: "404" */"./pages/404"))
const PizzaInfo = lazy(() => import (/* webpackChunkName: "PizzaInfo" */"./pages/PizzaInfo"))

export default function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                {/* 27.4 Кстати, мы могли бы также использовать Suspense здесь, если, например, у нас одна загрузка на всех страницах */}
                {/*<Suspense fallback={<div>Подождите, идёт загрузка...</div>}>*/}
                <Routes>
                    <Route index element={<Home/>}/>
                    {/* 27.1.1 Теперь нам нужно для "ленивой загрузки" добавить "Suspense" в который уже поместить подгружаемый комп. страницы. ↑ */}
                    <Route path="cart" element={<Suspense fallback={<div>Загрузка корзины...</div>}><Cart/></Suspense>}/>
                    {/* 19.1.1 Здесь нам потребуется сделать динамическую ссылку (с помощью ":" и динамического параметра после "id" (он может быть любым)), т.к. пиццы на странице комп. PizzaInfo будут разные, в зависимости от того, на какую кликнет пользователь. А чтобы определить информацию о какой пицце нам нужно открыть нам поможет id этой пиццы, которую мы будем прокидывать в комп. PizzaInfo. */}
                    {/*(Go to [PizzaInfo.tsx])*/}
                    <Route path="/pizza/:id" element={<Suspense fallback={<div>Загрузка информации о пицце...</div>}><PizzaInfo/></Suspense>}/>
                    <Route path="*" element={<Suspense fallback={<div>Загрузка страницы 404...</div>}><Page404/></Suspense>}/>
                </Routes>
                {/*</Suspense>*/}
            </div>
        </div>
    )
}