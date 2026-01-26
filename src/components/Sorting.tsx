import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {FilterState, setSortingDirection, setSortingTypeId} from "../redux/slices/filterSlice"
import {RootState} from "../redux/store";

const sortingList: { id: number; name: string }[] = [
    {id: 0, name: 'популярности'},
    {id: 1, name: 'цене'},
    {id: 2, name: 'алфавиту'}
]

const Sorting: React.FC = () => {
    const {sortingTypeId, sortingDirection} = useSelector((state: RootState): FilterState => state.filter)
    const dispatch = useDispatch()

    const [show, setShowing] = React.useState(false)

    // 16.0.0 Чтобы реализовать логику скрытия попапа по клику вне его области, мы сперва создадим реф-переменную, куда поместим этот попап.
    // 22.0 Мы можем типизировать реф-переменную, указывая название элемента, с которым она связана (узнать название можно во всплывающем окне, если навести на сам элемент).
    // (Go to [Categories.tsx])
    const sortRef = React.useRef<HTMLDivElement>(null)

    const selectSorting = (id: number) => {
        dispatch(setSortingTypeId(id))
        setShowing(false)
    }

    const dynamicPathToIcon = (direction: 'asc' | 'desc'): string => {
        const isAscending = direction === 'asc'
        const isAlphabetic = sortingTypeId === 2
        if (isAscending) {
            return isAlphabetic ? 'a-z-sorting.png' : 'ascending-sorting.png'
        }
        return isAlphabetic ? 'z-a-sorting.png' : 'descending-sorting.png'
    }

    const handleSortingBtn = () => dispatch(setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc'))

    // 16.0.2 Далее нам нужно создать слушатель события клик по всему элементу body. Это позволит нам определить, был ли клик по области попапа или нет. Здесь у нас будет хук useEffect, который должен вызваться лишь раз при первом рендере компонента. И, в отличие от остальных элементов страницы, где мы не можем просто, как в обычном JS, внутри ReactJS обращаться к элементам, а сначала кладём их сперва в реф-переменные через хук useRef, то сущность body — это исключение, и здесь мы так сделать можем.
    // 16.0.3 Итак, когда мы кликаем на что-то, то получаем в объект "evt", точнее в его свойство "path" список дочерних элементов, которые содержатся под мышкой в момент клика.
    // (Go to [/redux/slices/cartSlice.ts])
    React.useEffect(() => {
        // 22.5.0 We type 'evt' as MouseEvent (standard for click events) (globalThis.MouseEvent (or just Event) to explicitly tell TypeScript you want the native browser event, not the React one).
        const handleClickOutside = (evt: Event) => {
            // 22.5.0 Safety check: ensure target exists and is a Node (DOM element)
            const target = evt.target as Node

            const isOutside = sortRef.current && target && !sortRef.current.contains(target)

            // 22.5.2 For .closest(), the target must be an Element (HTMLElement extends Element)
            const isSortBtn = (target as HTMLElement)?.closest?.('.sort__btn')

            if (isOutside || isSortBtn) setShowing(false)
        }

        document.body.addEventListener('click', handleClickOutside)
        document.body.addEventListener('touchstart', handleClickOutside)

        // Конструкция "return () => {...}" означает выполнение кода перед тем, как элемент уберётся (размонтируется).
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
            document.body.removeEventListener('touchstart', handleClickOutside)
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