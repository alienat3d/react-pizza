import '@/assets/fonts/proxima-nova-regular.eot'
import '@/assets/fonts/proxima-nova-regular.woff2'
import '@/assets/fonts/proxima-nova-regular.woff'
import '@/assets/fonts/proxima-nova-regular.ttf'
import '@/assets/fonts/proxima-nova-extrabold.eot'
import '@/assets/fonts/proxima-nova-extrabold.woff2'
import '@/assets/fonts/proxima-nova-extrabold.woff'
import '@/assets/fonts/proxima-nova-extrabold.ttf'
import '@/assets/fonts/proxima-nova-black.eot'
import '@/assets/fonts/proxima-nova-black.woff2'
import '@/assets/fonts/proxima-nova-black.woff'
import '@/assets/fonts/proxima-nova-black.ttf'
import '@/assets/fonts/proxima-nova-bold.eot'
import '@/assets/fonts/proxima-nova-bold.woff2'
import '@/assets/fonts/proxima-nova-bold.woff'
import '@/assets/fonts/proxima-nova-bold.ttf'

import '@/scss/app.scss'

import Header from "@/components/Header.jsx"
import Categories from "@/components/Categories.jsx"
import Sort from "@/components/Sort.jsx"
import PizzaBlock from "@/components/PizzaBlock"
import Skeleton from "@/components/PizzaBlock/Skeleton.jsx"
import React from "react"


export default function App() {
  const [items, setItems] = React.useState([])
  // 7.1 Далее нам нужен некий "флажок", который будет давать команду react, что идёт загрузка страницы и нужно показывать Skeleton.
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://6952a95b3b3c518fca135a9c.mockapi.io/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .then(() => setIsLoading(false))
  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* 7.2 Теперь мы можем по условию, во время загрузки показывать скелетон блоков с пиццей. Однако, нам не нужно показывать для всех блоков, достаточно для некоторого кол-ва, например шести, чтобы не перегружать систему, если у нас очень много блоков на загрузку. Для этого нам нужен фейковый массив из 6 элементов. */}
            {
              isLoading ? [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>) :
                items.map(item => <PizzaBlock key={item.title} {...item} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}