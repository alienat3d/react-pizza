import pepperIcon from '/src/assets/img/pepper.svg'
import leafIcon from '/src/assets/img/leaf.svg'

import React from "react"
import {useNavigate, useParams} from "react-router"
import axios from "axios"

// 19.1.0 Теперь, для рассмотрения хука «useParams» мы представим, что нам дали задание сделать также страницу с информацией о каждой конкретной пицце. Для этого скопируем и немного отредактируем вёрстку из компонента PizzaBlock. Но сперва настроим рутинг.
// (Go to [App.tsx])

// 21.0.0 После установки TypeScript (npm install --save-dev typescript) и создание файла tsconfig.json в корне проекта, мы будем потихоньку исправлять ошибки, добавляя типизацию. Начнём с того, что добавим этому компоненту специальный тип "React.FC" (FunctionalComponent) ↓
const PizzaInfo: React.FC = () => {
  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  // 19.2.0 Теперь, с помощью хука «useParams» мы можем вытащить динамический параметр (в данном случае "id"), чтобы осуществить правильный рендер страницы.
  // ? Кстати, пришлось превратить все значения свойства объектов "id" из цифр в строчки, т.к. иначе MockAPI не находит отдельные элементы по id.
  const {id} = useParams()

  // 21.0.1 Здесь, нам нужно указать, что функция «useState» у нас будет принимать объект. Затем мы перечислим все его свойства с указанием их типов данных.
  const [pizzaInfo, setPizzaInfo] = React.useState<{
      img: string
      title: string
      vegetarian: boolean
      spicy: number
      filling: string
      price: number
  }>()

  // 19.4 Что можно ещё сделать в этом компоненте, так это отправлять пользователя на главную страницу, если данные о пицце не будут найдены с помощью уже известного хука «useNavigate».
  const navigate = useNavigate()

  // 19.2.1 Затем при помощи useEffect мы отправим один раз запрос на сервер, для получения информации об объекте конкретной пиццы, пользуясь запросом по id и взяв этот id из динамической ссылки из useParams.
  React.useEffect(() => {
    async function fetchPizzaInfo() {
      try {
        const {data} = await axios.get(`${URL}/items/${id}`)
        setPizzaInfo(data)
      } catch (error) {
        alert('Ошибка при получении данных о пицце')
        console.warn(error)
        navigate('/')
      }
    }

    fetchPizzaInfo()
  }, [])

  return (pizzaInfo &&
    <div className="pizza-block pizza-block--full-info">
      <img
        className="pizza-block__image"
        src={pizzaInfo.img.substring(1)}
        alt={`Изображение пиццы ${pizzaInfo.title}`}
      />
      <h4 className="pizza-block__title">{pizzaInfo.title}{pizzaInfo.vegetarian &&
        <img className={"pizza-block__title-icon"} src={leafIcon} alt=""/>}{pizzaInfo.spicy > 0 &&
        [...Array(pizzaInfo.spicy)].map((_, idx) => (
          <img
            key={idx}
            className="pizza-block__title-icon"
            src={pepperIcon}
            alt="Spicy"
          />
        ))
      }</h4>
      <p className="pizza-block__filling">{pizzaInfo.filling}</p>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizzaInfo.price} ₽</div>
        {/*<button onClick={onClickAddItem} className="button button--outline button--add">
          <svg width="12" height="12" viewBox="0 0 12 12"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItemsCount > 0 && <i>{addedItemsCount}</i>}
        </button>*/}
      </div>
    </div>
  )
}

export default PizzaInfo