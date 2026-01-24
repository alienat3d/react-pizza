import iconCartDark from '/src/assets/img/icons/icon-cart--dark.svg'

import {Link} from "react-router"
import {useDispatch, useSelector} from "react-redux"
import {clearList} from "../redux/slices/cartSlice"
import EmptyCart from "./EmptyCart"
import CartItem from "../components/CartItem"

export const Cart = () => {
// 16.7.0 Здесь мы будем заполнять вёрстку динамически из данных о добавленных пиццах в Redux хранилище. Поэтому, сперва мы извлечём те данные, которые нам понадобятся с помощью хука "useSelector" и будем их вставлять, а также необходимые экшены с помощью "dispatch".
    const {totalItems, totalPrice} = useSelector((state) => state.cart)
    // 16.7.1 А ещё нам потребуется массив со всеми добавленными пиццами, чтобы отрендерить их на странице корзины.
    const items = useSelector((state) => state.cart.items)
    const dispatch = useDispatch();

    const onClickClearList = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) dispatch(clearList())
    }

    // 16.9 Перед рендером корзины нам сперва нужно определить есть ли в ней что-то и если нет, то рендерить страницу-компонент пустой корзины. Т.е. если цена у нас вернёт false (если она равна 0), то мы вернём комп. EmptyCart. Это тоже форма условного рендера. Т.е. мы до рендера основного сделали проверку и если бы она прошла, то отрендерили что-то другое, например комп. пустой корзины.
    if (!totalPrice) return <EmptyCart/>

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <img src={iconCartDark} alt=""/>
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
                    {/*(Go to [/components/CartItem.tsx])*/}
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