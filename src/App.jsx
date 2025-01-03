import './fonts/proxima-nova-regular.eot'
import './fonts/proxima-nova-regular.woff2'
import './fonts/proxima-nova-regular.woff'
import './fonts/proxima-nova-regular.ttf'
import './fonts/proxima-nova-extrabold.eot'
import './fonts/proxima-nova-extrabold.woff2'
import './fonts/proxima-nova-extrabold.woff'
import './fonts/proxima-nova-extrabold.ttf'
import './fonts/proxima-nova-black.eot'
import './fonts/proxima-nova-black.woff2'
import './fonts/proxima-nova-black.woff'
import './fonts/proxima-nova-black.ttf'
import './fonts/proxima-nova-bold.eot'
import './fonts/proxima-nova-bold.woff2'
import './fonts/proxima-nova-bold.woff'
import './fonts/proxima-nova-bold.ttf'

import './scss/app.scss'

import {assortment} from '../db.json'

import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaItem from "./components/PizzaItem.jsx";

export default function App() {

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
            {
              assortment.map(item => (
                /*<PizzaItem key={item.id} img={item.img} title={item.title} filling={item.filling} doughTypes={item.doughTypes} sizes={item.sizes} price={item.price}/>
                * Если мы видим, что все свойства объекта совпадают с названием пропов, то мы можем существенно сократить: */
              <PizzaItem key={item.id} {...item}/>
              ))
            }
            {/*<PizzaItem img="./src/assets/img/pizza/cola-bbq.webp" title="Кола-барбекю" filling="Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус" price={599}/>*/}
          </div>
        </div>
      </div>
    </div>
  )
}