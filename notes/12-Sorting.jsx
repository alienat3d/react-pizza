import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {setSortingDirection, setSortingTypeId} from "/src/redux/slices/filterSlice.js"

const sortingList = [
    {id: 0, name: 'популярности'},
    {id: 1, name: 'цене'},
    {id: 2, name: 'алфавиту'}
  ]

// 13.4.0 Здесь же нам нужно переписать код под работу с Redux.
// function Sorting({value, valueBtn, onChangeSorting, onClickBtn}) {
function Sorting() {
  // 13.4.1 Итак, мы получаем в константы данные из хранилища Redux при помощи хука "useSelector". Он работает похожим образом, как в обычном JS EventListener. Т.е. он "слушает" стейт и при его обновлении ререндерит тот компонент, в котором он написан.
  // ? 13.5 Кстати, мы можем ещё немного сократить код и деструктурированием вытащить стейты в одну строчку.
  // const sortingId = useSelector((state) => state.filter.sortingId)
  // const sortingBtnValue = useSelector((state) => state.filter.sortingBtnValue)
  const {sortingTypeId, sortingDirection} = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const [show, setShowing] = React.useState(false)

  const selectSorting = (id) => {
    // onChangeSorting(id)
    // 13.4.2 Ну, а с помощью функции "dispatch" мы записываем в стейт слайса данные функцией-редьюсером, которая экспортируется из этого слайса.
    dispatch(setSortingTypeId(id))
    setShowing(false)
  }

  const dynamicPathToIcon = (direction) => {
    let iconName;
    if (direction === 'asc') {
      sortingTypeId !== 2 ? iconName = 'ascending-sorting.png' : iconName = 'a-z-sorting.png'
    } else {
      sortingTypeId !== 2 ? iconName = 'descending-sorting.png' : iconName = 'z-a-sorting.png'
    }
    return iconName
  }

  // const handleSortingBtn = () => onClickBtn(valueBtn === 'asc' ? 'desc' : 'asc')
  const handleSortingBtn = () => dispatch(setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc'))

  return (
    <div className="sort">
      <div className="sort__label">
        <button onClick={() => handleSortingBtn()} className="sort__btn">
          {/*<img src={`/src/assets/img/${dynamicPathToIcon(valueBtn)}`} alt=""/>*/}
          <img src={`/src/assets/img/${dynamicPathToIcon(sortingDirection)}`} alt=""/>
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setShowing(!show)}>{sortingList[sortingTypeId].name}</span>
      </div>
      {show &&
        (<div className="sort__popup">
          <ul>
            {sortingList.map((obj, index) => (
              <li
                key={index}
                onClick={() => selectSorting(index)}
                className={sortingTypeId === index ? 'active' : ''}>
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