import logoPic from '/src/assets/img/pizza-logo.svg'
import cartIcon from '/src/assets/img/icons/icon-cart.svg'

import React from "react"
import {Link, useLocation} from "react-router"
import {useSelector} from "react-redux";
import {selectCart} from "../redux/slices/cartSlice";
import Search from "./Search/index"

// 10.1.2 Здесь мы эти данные вытаскиваем через пропсы ({searchValue, setSearchValue}).
// 11.2.1 Теперь можно также убрать их отсюда...
// 16.2.0 Соединим компонент с хранилищем Redux, чтобы показывать в кнопке, ведущей в область корзины, кол-во товаров и их общую стоимость. Для этого мы вытащим хуком useSelector стейты items & totalPrice... ↓
// 19.0.0 Рассмотрим хук «useLocation», который является часто используемым хуком React Router. По сути своей, это замена стандартного "window.location" от React JS. И именно его следует использовать для соблюдения рекомендаций разработчиков React, а также для правильной работы приложения. И помимо тех функций, что выполняет стандартный метод JS "window.location" хук «useLocation» также триггерит ререндер компонента, в котором он записан, если произошло изменение данных в ссылке. ↓
const Header: React.FC = () => {
        // const {totalPrice, totalItems} = useSelector(state => state.cart)
        // 18.1.1 Теперь, мы можем сократить вызов "useSelector" до нашей функции
        // (Go to [cartSlice.ts])
        const {totalPrice, totalItems} = useSelector(selectCart)

        // 19.0.1 С помощью хука мы получаем в "location" объект, который содержит в свойстве "pathname" адрес текущей строки. ↓
        // ? Кстати, также в этом объекте есть и свойство "search", откуда можно вытаскивать запросы поиска (либо есть ещё специальных хук «useSearchParams»).
        const location = useLocation()

        return (
            <div className="header">
                <div className="container">
                    {/* 7.4.2 Теперь, везде в вёрстке, где у нас были ссылки на другие страницы, мы их смело заменим на обёртку ReactRouter Link, а вместо атрибута "href" у нас теперь будет атрибут "to". Так мы активируем молниеносную загрузку страниц, свойственную SPA, без полной перезагрузки. */}
                    <Link to="/">
                        <div className="header__logo">
                            <img width="38" src={logoPic} alt="Логотип"/>
                            <div>
                                <h1>React Pizza</h1>
                                <p>самая вкусная пицца во вселенной</p>
                            </div>
                        </div>
                    </Link>
                    {/* 10.1.3 Затем из Header мы передадим также через пропсы эти данные в 09-Search */}
                    {/* 11.2.2 ... и отсюда тоже. */}
                    {/* (Go to [/09-Search/index.tsx]) */}
                    {/* 19.0.2 Продемонстрируем приём с хуком useLocation сделав так, что на странице корзины у нас будут пропадать их шапки поиск и кнопка, ведущая в корзину, а на главной вновь появляться. */}
                    {/*(Go to [PizzaInfo.tsx])*/}
                    {location.pathname !== '/cart' &&
                        (<div className="header__controls">
                            <Search/>
                            <div className="header__cart">
                                <Link to="/cart" className="button button--cart">
                                    {/* 16.2.1 ... и передадим, где они должны отобразиться. ↓ */}
                                    <span>{totalPrice} ₽</span>
                                    <div className="button__delimiter"></div>
                                    <img className="button__cart-icon" src={cartIcon} alt=""/>
                                    {/* 16.2.2 */}
                                    {/*(Go to [/PizzaBlock/index.tsx])*/}
                                    <span>{totalItems}</span>
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        )
    }

export default Header