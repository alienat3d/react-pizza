import styles from './Search.module.scss'
import React from "react";
// 11.2.5.0 Нам ещё нехватает импорта самого SearchContext сюда...
// (Go to [App.jsx])
import {SearchContext} from "/src/App.jsx";

// 10.1.4 Теперь в 09-Search мы снова вытаскиваем эти данные
// 11.2.3 И отсюда тоже уберём.
// 11.2.4 Но, чтобы воспользоваться Реакт контекстом, нам нужно использовать здесь спец. хук "useContext". И т.к. мы в [App.jsx] указали в value для обёртки "SearchContext.Provider" "searchValue" и "setSearchValue", то здесь мы можем их вытащить через хук.
const Search = () => {
  const {searchValue, setSearchValue} = React.useContext(SearchContext)

  return (
    <label className={styles.root}>
      <svg className={styles.magnifyingGlassIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          d="M35.71 34.29c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L23.53 24.93c-.2-.2-.53-.21-.74-.04 0 0-.16.14-.45.36-2.33 1.73-5.21 2.75-8.33 2.75C6.27 28 0 21.73 0 14S6.27 0 14 0s14 6.27 14 14c0 3.05-.97 5.87-2.63 8.17-.25.34-.47.61-.47.61-.18.21-.16.55.04.75L35.71 34.3ZM14 26c6.63 0 12-5.37 12-12S20.63 2 14 2 2 7.37 2 14s5.37 12 12 12Z"
          fill="#b6b6b6"/>
      </svg>
      <button onClick={() => setSearchValue('')} className={`${styles.clearBtn} ${searchValue ? styles.visible : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.88 67.28">
          <path
            d="m34.31,46.84c-.85-.85-.85-2.24,0-3.09l10.13-10.13-10.13-10.13c-.85-.85-.85-2.24,0-3.09l2.43-2.43c.85-.85,2.24-.85,3.09,0l10.13,10.13,10.13-10.13c.85-.85,2.24-.85,3.09,0l2.43,2.43c.85.85.85,2.24,0,3.09l-10.13,10.13,10.13,10.13c.85.85.85,2.24,0,3.09l-2.43,2.43c-.85.85-2.24.85-3.09,0l-10.13-10.13-10.13,10.13c-.85.85-2.24.85-3.09,0l-2.43-2.43Z"
            fill="#b6b6b6"/>
          <path
            d="m15.97,8.1C19.5,3.02,25.29,0,31.48,0h33.49c10.44,0,18.91,8.46,18.91,18.91v29.47c0,10.44-8.46,18.91-18.91,18.91H31.48c-6.19,0-11.98-3.02-15.52-8.1L1.48,38.37c-1.98-2.84-1.98-6.62,0-9.46L15.97,8.11h0Zm15.52-.29c-3.63,0-7.03,1.77-9.1,4.76l-14.48,20.81c-.11.16-.11.38,0,.54l14.48,20.81c2.07,2.98,5.48,4.76,9.1,4.76h33.49c6.12,0,11.09-4.97,11.09-11.09v-29.47c0-6.12-4.97-11.09-11.09-11.09H31.48Z"
            fillRule="evenodd" fill="#b6b6b6"/>
        </svg>
      </button>
      {/* 10.2 Тут мы подошли к теме контролируемых инпутов (https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable). Чтобы сделать этот инпут контролируемым, мы допишем слушатель по событию onChange и будем получать значение ввода через "event.target.value". А значение сохранять в стейт searchValue. */}
      {/* 10.3 Отлично, теперь у нас сохраняются любые данные, введённые в этот инпут в стейте "searchValue" в App компоненте. Однако в рекомендациях React также стоит, что тот инпут, который меняет стейт, следует также засинхронизировать со стейтом, то бишь хранить в нём значение стейта. Для этого поместим в директиву "value" значение стейта "searchValue". Теперь этот инпут считается котролируемым Реактом. */}
      {/* (Go to [App.jsx]) */}
      <input value={searchValue} onChange={evt => setSearchValue(evt.target.value)} className={styles.input}
             placeholder={'Название пиццы...'} name="search"/>
    </label>
  )
}

export default Search