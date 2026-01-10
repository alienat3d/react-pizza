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

// import { assortment } from '@/db/db.json'

import Header from "@/components/Header.jsx"
import Categories from "@/components/Categories.jsx"
import Sort from "@/components/Sorting.jsx"
import PizzaItem from "@/components/PizzaItem"
import Skeleton from "@/components/PizzaItem/Skeleton.jsx"
import React from "react"

// 7.1 Далее нам нужен некий "флажок", который будет давать команду react, что идёт загрузка страницы и нужно показывать Skeleton.
const [isLoading, setIsLoading] = React.useState(false)

export default function App() {
  // 6.1 Отлично, когда мы удостоверились, что данные с сервера успешно получаются, то мы можем поместить их в стейт.
  const [items, setItems] = React.useState([])

  // * 6.0 Так как получать данные из локального JSON-файла в виде БД в реальных проектах не принято, то сделаем это через тренировочное API "MockAPI" при помощи метода fetch. Через метод "then", после ответа сервера мы получаем этот ответ и переводим его в вид, который сможем использовать в приложении — JSON методом "json".
  // 6.2 Мы также используем метод записи в стейт "setItems", чтоб динамически обновлять стейт свежими полученными с сервера данными, куда и поместим их.
  // 6.3 Однако непозволительно просто так вызывать метод fetch, так как это приведёт к проблеме infinity loop, когда метод "fetch" будет обновлять стейт, тем самым заново запуская функцию "App", таким образов снова запуская fetch и так, пока сервер не заблокирует нас или не зависнет браузер. Чтобы fetch, или запрос на сервер выполнялся лишь раз, разумно будет использовать хук "useEffect".
  // ? Кстати, когда у нас вторым аргументом в "useEffect" пустой массив, то это значит выполнить функцию лишь раз при первом рендере компонента, а если поместить в этот массив какой-нибудь стейт, то функция будет следить за изменениями его значения и запускать функцию вновь, если значение изменится.
  React.useEffect(() => {
      fetch('https://6952a95b3b3c518fca135a9c.mockapi.io/items')
        .then(response => response.json())
        .then((data) => setItems(data))
    }, [])

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						 <Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{

							items.map(item => (
								/*<PizzaItem key={item.id} img={item.img} title={item.title} filling={item.filling} doughTypes={item.doughTypes} sizes={item.sizes} price={item.price}/>
								* Если мы видим, что все свойства объекта совпадают с названием пропов, то мы можем существенно сократить: */
								<PizzaItem key={item.title} {...item} />
							))
						}
						{/*<PizzaItem img="./src/assets/img/pizza/cola-bbq.webp" title="Кола-барбекю" filling="Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус" price={599}/>*/}
					</div>
				</div>
			</div>
		</div>
	)
}