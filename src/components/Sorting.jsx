import React from "react"
import PropTypes from "prop-types"

function Sorting({value, valueBtn, onChangeSorting, onClickBtn}) {
  // 5.2.0 Для того, чтобы по клику на выделенное оранжевое слово в элементе сортировки, происходила собственно сама сортировка, нам нужно сначала создать стейт, в который мы поместим текущее значение с параметрами, по которым производится сортировка товаров.
  // 5.2.1 Но, сперва, нам нужен переключатель "show", который будет показывать попап с выбором категорий внутри, со значением по умолчанию "false". ↓
  const [show, setShowing] = React.useState(false)

  // 5.3.2 А в ещё одном стейте мы будем хранить выбранный тип сортировки.
  // const [selected, setSelected] = React.useState(0)

  // 5.3.0 Теперь переходим к функционалу самой сортировки. Для неё нам нужен массив, в котором мы перечислим все возможные опции. ↓
  // 9.0 В родительский компонент нам нужно передавать англоязычные названия, а отображать русскоязычные, поэтому нам нужно из массива сделать объект из которого мы будем циклом map отображать в вёрстке ниже список, а в кастомную функцию передавать англоязычное значение из свойств "sortingName".
  // const sortingList = ['популярности', 'цене', 'алфавиту']
  const sortingList = [
    {id: 0, name: 'популярности'},
    {id: 1, name: 'цене'},
    {id: 2, name: 'алфавиту'}
  ]

  // 5.3.3 Далее мы создадим отдельную функцию "selectSorting", т.к. нам нужно при выборе также скрывать попап, а в атрибуте слушателя тега мы не можем производить более одной операции.
  const selectSorting = (id) => {
    onChangeSorting(id)
    setShowing(false)
  }

  const dynamicPathToIcon = (direction) => {
    let iconName;
    if (direction === 'asc') {
      value !== 2 ? iconName = 'ascending-sorting.png' : iconName = 'a-z-sorting.png'
    } else {
      value !== 2 ? iconName = 'descending-sorting.png' : iconName = 'z-a-sorting.png'
    }
    return iconName
  }

  const handleSortingBtn = () => onClickBtn(valueBtn === 'asc' ? 'desc' : 'asc')

  return (
    <div className="sort">
      {/*<div className={show ? 'sort__label sort__label--active' : 'sort__label'}>*/}
      <div className="sort__label">
        {/*{value !== 2 ? 'sort__btn-sorting' : 'sort__btn-sorting sort__btn-sorting--alphabetical'}*/}
        <button onClick={() => handleSortingBtn()} className="sort__btn"><img
          src={`/src/assets/img/${dynamicPathToIcon(valueBtn)}`} alt=""/></button>
        <b>Сортировка по:</b>
        {/* 5.2.3 Добавим на оранжевое слово слушатель клика, который будет изменять значение стейта "show" на противоположное и показывать или скрывать попап. */}
        <span onClick={() => setShowing(!show)}>{sortingList[value].name}</span>
      </div>
      {/* 5.2.2 Далее, чтобы отображать попап, когда нам нужно, т.е. когда значение стейта будет true, используем условный рендеринг. */}
      {/* ? Кстати, можно было бы также использовать тернарник, если нам нужно, например отображать что-то иное, когда условие false. */}
      {show &&
        (<div className="sort__popup">
          <ul>
            {/* 5.3.1 Теперь перебором массива методом map мы размножим опции в отображаемом попапе. ↑ */}
            {sortingList.map((obj, index) => (
              <li
                key={index}
                onClick={() => selectSorting(obj.id)}
                className={value === index ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>)
      }
    </div>
  )
}

export default Sorting

Sorting.propTypes = {
  value: PropTypes.number.isRequired,
  valueBtn: PropTypes.string.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
  onClickBtn: PropTypes.func.isRequired,
};