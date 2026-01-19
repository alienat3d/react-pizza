import PropTypes from "prop-types"
import {useDispatch} from "react-redux";
import {addItem, removeItem, removeItems} from "../redux/slices/cartSlice.js";

const CartItem = ({id, img, title, dough, size, price, amount}) => {
  const dispatch = useDispatch()

  // 16.8 Здесь нам помимо того, что нужно разложить все пропсы по нужным местам в вёрстке, нам также нужно настроить функционал кнопок. Начнём с кнопки добавления товара "+". Вместо того чтобы создавать доп. экшен в хранилище мы можем пойти другим путём и использовать экшен "addItem", в который мы будем передавать объект, с одним лишь id. Почему так? Да потому, что мы уверены в том, что, если мы находимся в корзине и эта пицца отображена, то она точно уже в хранилище. Тогда нам достаточно лишь передать id, по которому её найдёт экшен "addItem" и увеличит на 1 значение свойства "amount".
  const onClickAdd = () => dispatch(addItem({id}))

  const onClickRemove = () => dispatch(removeItem(id))
  const onClickRemoveAll = () => {
    if (window.confirm('Вы действительно хотите удалить этот товар?')) dispatch(removeItems(id))
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={img} alt={title}/>
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{dough}, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <button onClick={onClickRemove} className="button button--outline button--circle cart__item-count-minus">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path fill="#EB5A1E" d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z"/>
            <path fill="#EB5A1E" d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z"/>
          </svg>
        </button>
        <b>{amount}</b>
        <button onClick={onClickAdd} className="button button--outline button--circle cart__item-count-plus">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path fill="#EB5A1E" d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z"/>
            <path fill="#EB5A1E" d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z"/>
          </svg>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * amount} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button onClick={onClickRemoveAll} className="button button--outline button--circle">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path fill="#EB5A1E" d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z"/>
            <path fill="#EB5A1E" d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dough: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
}