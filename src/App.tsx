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
import {Route, Routes} from "react-router"
import Home from "./pages/Home"
import {Cart} from "./pages/Cart"
import {Page404} from "./pages/404"
import PizzaInfo from "./pages/PizzaInfo"
import Header from "./components/Header"

export default function App() {
  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="cart" element={<Cart/>}/>
            {/* 19.1.1 Здесь нам потребуется сделать динамическую ссылку (с помощью ":" и динамического параметра после "id" (он может быть любым)), т.к. пиццы на странице комп. PizzaInfo будут разные, в зависимости от того, на какую кликнет пользователь. А чтобы определить информацию о какой пицце нам нужно открыть нам поможет id этой пиццы, которую мы будем прокидывать в комп. PizzaInfo. */}
            {/*(Go to [PizzaInfo.tsx])*/}
            <Route path="/pizza/:id" element={<PizzaInfo/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
      </div>
  )
}