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
            <PizzaItem img="./img/pizza/cola-bbq.webp" title="Кола-барбекю" filling="Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус" price={599}/>
            <PizzaItem img="./img/pizza/beef-with-pesto.webp" title="Говядина с песто" filling="Пряная говядина, соус песто, шампиньоны, сладкий перец, моцарелла, красный лук, фирменный соус альфредо" price={639}/>
            <PizzaItem img="./img/pizza/beefstroganoff.webp" title="Бефстроганов" filling="Пряная говядина, шампиньоны, ароматный грибной соус, маринованные огурчики, моцарелла, красный лук, фирменный соус альфредо" price={549}/>
            <PizzaItem img="./img/pizza/meaty-with-adjika.webp" title="Мясная с аджикой" filling="Баварские колбаски, острый соус аджика, острые колбаски чоризо, цыпленок, пикантная пепперони, моцарелла, фирменный томатный соус" price={549}/>
          </div>
        </div>
      </div>
    </div>
  )
}