import {Link} from "react-router";

export const EmptyCart = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пуста <icon>😕</icon></h2>
        <p>
          Вероятно, вы ещё не добавили пиццу в корзину.<br/>
          Пожалуйста, перейдите на главную страницу, чтобы выбрать и добавить пиццу в корзину.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Вернуться на главную страницу</span>
        </Link>
      </div>
    </div>
  )
}