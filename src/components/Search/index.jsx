import styles from './Search.module.scss'

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setInputValue} from "/src/redux/slices/searchSlice.js";

// import {SearchContext} from "/src/App.jsx";

const Search = () => {
  // const {searchValue, setSearchValue} = React.useContext(SearchContext)
  const searchValue = useSelector((state) => state.search.inputValue)
  const dispatch = useDispatch()

  // 14.2.3 Для этого у нас есть специальный хук «useRef»
  const searchInputRef = React.useRef()

  // 14.2.1 Здесь мы используем хук "useEffect", чтобы сказать Реакту, что когда произойдёт первый рендер приложения, нужно найти инпут.
  // 14.2.2 Создадим новую функцию, которая будет очищать поиск и делать фокус на нём.
  // 14.2.5 Теперь, чтобы извлечь из ref-переменной нужную нам ссылку на DOM-элемент, то обратимся к свойству этого объекта "current".
  const clearSearch = () => {
    dispatch(setInputValue(''))
    searchInputRef.current.focus()
    // document.querySelector("input").focus() - но так в Реакте искать DOM-элементы не принято и считается дурным тоном
  }

  return (
    <label className={styles.root}>
      <svg className={styles.magnifyingGlassIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          d="M35.71 34.29c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L23.53 24.93c-.2-.2-.53-.21-.74-.04 0 0-.16.14-.45.36-2.33 1.73-5.21 2.75-8.33 2.75C6.27 28 0 21.73 0 14S6.27 0 14 0s14 6.27 14 14c0 3.05-.97 5.87-2.63 8.17-.25.34-.47.61-.47.61-.18.21-.16.55.04.75L35.71 34.3ZM14 26c6.63 0 12-5.37 12-12S20.63 2 14 2 2 7.37 2 14s5.37 12 12 12Z"
          fill="#b6b6b6"/>
      </svg>
      {/*14.2.0 Теперь, нам также хотелось бы возвращать фокус на строку ввода после удаления её содержимого кнопкой очистки. ↑ */}
      <button onClick={clearSearch}
              className={`${styles.clearBtn} ${searchValue ? styles.visible : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.88 67.28">
          <path
            d="m34.31,46.84c-.85-.85-.85-2.24,0-3.09l10.13-10.13-10.13-10.13c-.85-.85-.85-2.24,0-3.09l2.43-2.43c.85-.85,2.24-.85,3.09,0l10.13,10.13,10.13-10.13c.85-.85,2.24-.85,3.09,0l2.43,2.43c.85.85.85,2.24,0,3.09l-10.13,10.13,10.13,10.13c.85.85.85,2.24,0,3.09l-2.43,2.43c-.85.85-2.24.85-3.09,0l-10.13-10.13-10.13,10.13c-.85.85-2.24.85-3.09,0l-2.43-2.43Z"
            fill="#b6b6b6"/>
          <path
            d="m15.97,8.1C19.5,3.02,25.29,0,31.48,0h33.49c10.44,0,18.91,8.46,18.91,18.91v29.47c0,10.44-8.46,18.91-18.91,18.91H31.48c-6.19,0-11.98-3.02-15.52-8.1L1.48,38.37c-1.98-2.84-1.98-6.62,0-9.46L15.97,8.11h0Zm15.52-.29c-3.63,0-7.03,1.77-9.1,4.76l-14.48,20.81c-.11.16-.11.38,0,.54l14.48,20.81c2.07,2.98,5.48,4.76,9.1,4.76h33.49c6.12,0,11.09-4.97,11.09-11.09v-29.47c0-6.12-4.97-11.09-11.09-11.09H31.48Z"
            fillRule="evenodd" fill="#b6b6b6"/>
        </svg>
      </button>
      {/* 14.2.4 С помощью директивы "ref" мы связываем ref-переменную с её DOM-элементом. ↑ */}
      <input ref={searchInputRef} value={searchValue} onChange={evt => dispatch(setInputValue(evt.target.value))}
             className={styles.input}
             placeholder={'Название пиццы...'}
             name="search"/>
    </label>
  )
}

export default Search