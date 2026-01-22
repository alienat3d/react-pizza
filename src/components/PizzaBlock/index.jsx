import pepperIcon from '/src/assets/img/pepper.svg'
import leafIcon from '/src/assets/img/leaf.svg'

import {useState} from "react"
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from "react-redux"
import {addItem, selectCartItemById} from "/src/redux/slices/cartSlice.js"

const doughTypeNames = ['тонкое', 'традиционное']
// const sizeValues = ['26', '30', '40']

export default function PizzaBlock({id, img, title, price, filling, doughTypes, sizes, vegetarian, spicy}) {
  // 16.6.1 Добавим стейт "amount" из Redux. Для этого нам нужно искать эту пиццу по id.
  // const itemInCart = useSelector(state => state.cart.items.find(obj => obj.id === id))
  // 18.2.1 Заменим теперь на нашу функцию-селектор из Редакса:
  const itemInCart = useSelector(selectCartItemById(id))
  // 16.6.2 Дальше мы будем искать в этом объекте свойство "amount", а если не найдём, то присваивать 0. ↓
  const addedItemsCount = itemInCart ? itemInCart.amount : 0
  const dispatch = useDispatch()

  // Здесь хранятся названия видов теста

  // Когда нам нужно менять данные и также менять зависимый от них кусок DOM, то используем состояния, чтобы оптимизировать работу приложения и снизить нагрузку на устройство пользователя.
  // 16.6.0 Теперь, когда у нас для каждой добавленной пиццы в хранилище Redux есть свойство "amount", мы можем усовершенствовать наш механизм отображения добавленных пицц в списке, чтобы оно не сбрасывалось при обновлении страницы или при переходе на другую страницу пагинации. ↑
  // const [pizzaCount, setPizzaCount] = useState(0)

  // Для того чтобы можно было выбрать определённый тип теста или размер нам нужны ещё два состояния
  const [pizzaDoughType, setDoughType] = useState(1)

  const [pizzaSize, setSize] = useState(1)

  // const addPizzaCount = () => setPizzaCount(pizzaCount + 1)
  // 16.3.0 Здесь мы будем при добавлении генерить объект с описанием добавленной пиццы перед отправкой её в хранилище Redux. ↓
  // 16.3.2 Затем мы передаём сгенерированный item в экшен добавления объекта в массив имеющихся пицц в корзине покупок в Redux хранилище.
  // (Go to [cartSlice.js])
  const onClickAddItem = () => {
    const item = {
      id, amount: 1, img, title, price, dough: doughTypeNames[pizzaDoughType], size: sizes[pizzaSize]
    }
    // setPizzaCount(pizzaCount + 1)
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={img}
        alt={`Изображение пиццы ${title}`}
      />
      <h4 className="pizza-block__title">{title}{vegetarian &&
        <img className={"pizza-block__title-icon"} src={leafIcon} alt=""/>}{spicy > 0 &&
        [...Array(spicy)].map((_, idx) => (
          <img
            key={idx}
            className="pizza-block__title-icon"
            src={pepperIcon}
            alt="Spicy"
          />
        ))
      }</h4>
      <p className="pizza-block__filling">{filling}</p>
      <div className="pizza-block__selector">
        <ul>
          {/* Что касается сохранения стейта, мы можем использовать тут альтернативный вариант сразу подставить функции сохранения стейта в стрелочную функцию. Когда у нас подобная ситуация, когда у нам нужно делать одну лишь функцию сохранения стейта, вполне подходящий вариант и более коротки, в отличие от того, что я сделал в [Categories.jsx]. */}
          {
            doughTypes.map((typeIndex, index, array) =>
              <li onClick={array.length > 1 ? () => setDoughType(index) : null}
                  key={typeIndex}
                  className={array.length > 1 ? (pizzaDoughType === index ? 'active' : '') : 'active'}
              >{doughTypeNames[typeIndex]}</li>)
          }
        </ul>
        <ul>
          {
            sizes.map((size, index, array) =>
              <li onClick={array.length > 1 ? () => setSize(index) : 'null'}
                  key={index}
                  className={array.length > 1 ? (pizzaSize === index ? 'active' : '') : 'active'}
              >{size} см</li>
            )
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        {/* 16.3.1 */}
        <button onClick={onClickAddItem} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {/* 16.6.3 Здесь мы будем рендерить этот счётчик только, если значение в объекте этой пиццы > 0. */}
          {/*(Go to [/pages/Cart.jsx])*/}
          {addedItemsCount > 0 && <i>{addedItemsCount}</i>}
        </button>
      </div>
    </div>
  )
}

PizzaBlock.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  filling: PropTypes.string.isRequired,
  doughTypes: PropTypes.arrayOf(PropTypes.number).isRequired, // Array of numbers
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,      // Array of numbers
  vegetarian: PropTypes.bool,
  spicy: PropTypes.number,
}