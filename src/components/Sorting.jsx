import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {setSortingDirection, setSortingTypeId} from "/src/redux/slices/filterSlice.js"

const sortingList = [
  {id: 0, name: 'популярности'},
  {id: 1, name: 'цене'},
  {id: 2, name: 'алфавиту'}
]

function Sorting() {
  const {sortingTypeId, sortingDirection} = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const [show, setShowing] = React.useState(false)

  // 16.0.0 Чтобы реализовать логику скрытия попапа по клику вне его области, мы сперва создадим реф-переменную, куда поместим этот попап.
  const sortRef = React.useRef(null)

  const selectSorting = id => {
    dispatch(setSortingTypeId(id))
    setShowing(false)
  }

  const dynamicPathToIcon = direction => {
    let iconName;
    direction === 'asc' ?
      sortingTypeId !== 2 ? iconName = 'ascending-sorting.png' : iconName = 'a-z-sorting.png' :
      sortingTypeId !== 2 ? iconName = 'descending-sorting.png' : iconName = 'z-a-sorting.png'

    return iconName
  }

  const handleSortingBtn = () => dispatch(setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc'))

  // 16.0.2 Далее нам нужно создать слушатель события клик по всему элементу body. Это позволит нам определить, был ли клик по области попапа или нет. Здесь у нас будет хук useEffect, который должен вызваться лишь раз при первом рендере компонента. И, в отличие от остальных элементов страницы, где мы не можем просто, как в обычном JS, внутри ReactJS обращаться к элементам, а сначала кладём их сперва в реф-переменные через хук useRef, то сущность body — это исключение, и здесь мы так сделать можем.
  // 16.0.3 Итак, когда мы кликаем на что-то, то получаем в объект "evt", точнее в его свойство "path" список дочерних элементов, которые содержатся под мышкой в момент клика.
  // (Go to [/redux/slices/cartSlice.js])
  React.useEffect(() => {
    const handleClickOutside = (evt) => {
      const isOutside = sortRef.current && !sortRef.current.contains(evt.target)
      const isSortBtn = evt.target.closest('.sort__btn')

      if (isOutside || isSortBtn) setShowing(false)
    }

    document.body.addEventListener('click', handleClickOutside)
    // document.body.addEventListener('touchstart', handleClickOutside) - как будто бы и не требуется, вроде должно работать и без этого дополнительного слушателя, но лучше это проверить

    // Конструкция "return () => {...}" означает выполнение кода перед тем, как элемент уберётся (размонтируется).
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
      // document.body.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // 16.0.1 Привяжем её к попапу с помощью директивы "ref".
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <button onClick={() => handleSortingBtn()} className="sort__btn">
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