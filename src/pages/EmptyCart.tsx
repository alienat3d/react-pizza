import emptyCartImg from '/src/assets/img/empty-cart.png'

import React from "react"
import {Link} from "react-router"

const EmptyCart: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пуста 😕</h2>
        <p>
          Вероятно, вы ещё не добавили пиццу в корзину.<br/>
          Пожалуйста, перейдите на главную страницу, чтобы выбрать и добавить пиццу в корзину.
        </p>
        <img src={emptyCartImg} alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart