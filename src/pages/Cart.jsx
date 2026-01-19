import {Link} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "/src/components/CartItem.jsx";
import {clearList} from "../redux/slices/cartSlice.js";

export const Cart = () => {
// 16.7.0 Здесь мы будем заполнять вёрстку динамически из данных о добавленных пиццах в Redux хранилище. Поэтому, сперва мы извлечём те данные, которые нам понадобятся с помощью хука "useSelector" и будем их вставлять, а также необходимые экшены с помощью "dispatch".
  const {totalItems, totalPrice} = useSelector((state) => state.cart)
  // 16.7.1 А ещё нам потребуется массив со всеми добавленными пиццами, чтобы отрендерить их на странице корзины.
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch();

  const onClickClearList = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) dispatch(clearList())
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path stroke="#fff" fill="none"
                    d="M6.333 16.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Zm8 0a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM4.78 5h11.553l-1.12 5.593a1.334 1.334 0 0 1-1.333 1.074H6.833a1.334 1.334 0 0 1-1.333-1.16l-1.013-7.68a1.333 1.333 0 0 0-1.32-1.16h-1.5"/>
            </svg>
            Корзина
          </h2>
          <button onClick={onClickClearList} className="cart__clear">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path stroke="#B6B6B6" fill="none"
                    d="M2.5 5h15M6.67 5V3.33a1.67 1.67 0 0 1 1.66-1.66h3.34a1.67 1.67 0 0 1 1.66 1.66V5m2.5 0v11.67a1.67 1.67 0 0 1-1.66 1.66H5.83a1.67 1.67 0 0 1-1.66-1.66V5h11.66Zm-7.5 4.17v5m3.34-5v5"/>
            </svg>
            <span>Очистить корзину</span>
          </button>
        </div>
        <div className="content__items">
          {/* 16.7.2 Однако, сперва проведём небольшой рефакторинг и поместим вёрстку с информацией о добавленной пицце в отдельный компонент. */}
          {/* 16.7.3 Их мы будем выводить циклом. */}
          {/*(Go to [/components/CartItem.jsx])*/}
          {
            items.map(item => <CartItem key={item.id} {...item}/>)
          }
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всего пицц: <b>{totalItems} шт.</b> </span>
            <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <svg width="8" height="14" viewBox="0 0 8 14">
                <path stroke="#D3D3D3" d="M7 13 1 6.93 6.86 1"/>
              </svg>
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}