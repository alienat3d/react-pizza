import React from 'react'
import axios from "axios"
import qs from "qs"
import {useNavigate} from "react-router"
import {useDispatch, useSelector} from 'react-redux'
import {setFilters, setPageNumber} from "/src/redux/slices/filterSlice.js"

import Categories from "/src/components/Categories.jsx"
import Sorting from "/src/components/Sorting.jsx"
import PizzaBlock from "/src/components/PizzaBlock"
import Skeleton from "/src/components/PizzaBlock/Skeleton.jsx"
import Pagination from "/src/components/Pagination/index.jsx"

// 15.0 Здесь мы добавим такой функционал, чтобы параметры фильтров и сортировок также сохранялись в строке адреса браузера (чтобы можно было этот адрес скопировать для доступа к этому набору пицц позже или чтобы с кем-то поделиться). Есть специальная JS библиотека для этого «querystring» (https://www.npmjs.com/package/qs), которая поможет нам парсить и генерировать определённые параметры для нашей цели. ↓

const Home = () => {
  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  const LIMIT_PER_PAGE = 8

  const {categoryName, currentPage, sortingDirection, sortingTypeId} = useSelector((state) => state.filter)
  const searchValue = useSelector((state) => state.search.inputValue)
  const dispatch = useDispatch()

  // 15.2 Теперь, также, как и dispatch, нам нужно импортировать присвоить хук useNavigate в константу, чтобы ей оборачивать. ↓
  const navigate = useNavigate()

  // 15.6.0 Кажется у нас проблема — при вводе ссылки с определёнными фильтрами в ней, у нас сбрасываются фильтры на те, что стоят по умолчанию. Это происходит из-за конфликта двух useEffect хуков, где один парсит, а друг синхронизирует запрос в адресной строке с выбранными фильтрами, не дождавшись вступления изменений, перезаписывает значения теми, что были изначально. Нам нужно сделать флажок, чтобы второй хук, который синхронизирует параметры фильтров в стейте с адресной строкой, срабатывал только в случае, когда фильтры действительно изменились. Создадим для этого реф-переменную isMounted. ↓
  const isMounted = React.useRef(false)

  // 15.7.0 Также, чтобы избежать двойного запроса на сервер, создадим "флажок" реф-переменную isSearch. ↓
  const isSearch = React.useRef(false)

  const [totalPages, setTotalPages] = React.useState(0)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get(URL + '/items')
      .then(response => {
          const pages = Math.ceil(response.data.length / LIMIT_PER_PAGE)
          setTotalPages(pages)
        },
        error => console.error(error)
      )
  }, [])

  // 15.4.0 Теперь, здесь мы также проверим, что находится в адресной строке, и если там ссылка с параметрами сортировки, то нам нужно их спарсить и применить нужные параметры. Есть несколько способов это сделать, первый классический JS-способ (window.location.search) получения запроса из ссылки, который мы и применим, а также альтернативный способ с хуком Реакта.
  // (Альтернативный способ "useSearchParams")
  // 15.4.1 Итак, мы укажем, при помощи useEffect, что это должно происходить лишь 1 раз при первом рендере компонента страницы. При условии, что в адресе есть какой-то запрос мы будем парсить из него объект с параметрами "params" с помощью метода "parse" библиотеки "qs". Однако, нам передаётся запрос с "?" вначале, а он нам не нужен и его нужно убрать, например, методом substring.
  // 15.5.0 Эти параметры мы теперь передадим в хранилище Redux.
  // (Go to [filterSlice.js])
  // 15.5.2 Теперь при помощи dispatch и нового экшена "setFilters" мы помещаем извлечённые параметры фильтров в хранилище Redux.
  // 15.7.1 Здесь, если параметры фильтров в адресе были найдены, то мы переключим isSearch в true. ↓
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      dispatch(setFilters(params))

      isSearch.current = true
    }
  }, [])

  const generateLink = (categoryName, sortingTypeId, sortingDirection, searchValue, currentPage) => {
    let link = URL + '/items'
    let params = []

    // Handle Pagination
    params.push(`page=${currentPage}`)
    params.push(`limit=${LIMIT_PER_PAGE}`)

    // Handle Categories
    switch (categoryName) {
      case 'new':
        params.push('new=true')
        break
      case 'meaty':
        params.push('category=meaty')
        break
      case 'vegetarian':
        params.push('vegetarian=true')
        break
      case 'grill':
        params.push('category=grill')
        break
      case 'spicy':
        params.push('spicy=[1,2,3]')
        break
      case 'chicken':
        params.push('category=chicken')
        break
      // 'all' adds nothing to params
    }

    // Handle Sorting
    switch (sortingTypeId) {
      case 0:
        params.push('sortBy=rating')
        break
      case 1:
        params.push('sortBy=price')
        break
      case 2:
        params.push('sortBy=title')
        break
    }

    // Handle Ascending or Descending
    sortingDirection === 'asc' ? params.push('order=asc') : params.push('order=desc')

    // Join params with '&' and prefix with '?' if any exist
    if (params.length > 0) link += '?' + params.join('&')

    // Честно говоря, поиск в MockAPI, хотя и работает, но довольно странно, точнее работает сам по себе, но не в сочетании с фильтрами.
    // TODO: Разобраться с поиском (возможно вернуться на JS-поиск по массиву данных.
    if (searchValue) {
      link += `&search=${searchValue}`
    }

    return link
  }

  // 15.7.2 Здесь, если isSearch в положении true, то это значит, что React только что спарсил параметры фильтров из запроса и мы пропустим этот запрос на сервер, который запрашивал значения по умолчанию. Но т.к. Redux обновился, то эта логика сработает вновь, но т.к. мы уже переключили флажок isSearch в положение false, то запрос на сервер в этот раз сработает с корректными параметрами фильтров. (это такой лайфхак при работе с хуком useEffect, если мы не хотим, чтобы он сработал в первый рендер)
  React.useEffect(() => {
    if (isSearch.current) {
      isSearch.current = false
      return
    }

    setIsLoading(true)

    axios.get(generateLink(categoryName, sortingTypeId, sortingDirection, searchValue, currentPage))
      .then(response => setItems(response.data),
        error => console.error(error))
      .then(() => setIsLoading(false))
  }, [categoryName, sortingTypeId, sortingDirection, searchValue, currentPage])

// 15.1 С помощью хука useEffect мы создадим отдельную функцию, которая будет заниматься парсингом параметров сортировки и передавать их в адресную строку. В зависимости хука мы передадим те же стейты, что и выше. Далее, с помощью библиотеки «querystring» мы будем принимать параметры и превращать их в одну строчку. В объект мы передаём все параметры, которые мы хотим парсить (пока обойдёмся без введённого поиска, потом можно и его добавить при желании). Помним, что если свойство и значение имеют одинаковые названия, то их можно сократить. ↑
// 15.3 Теперь мы можем использовать этот хук «navigate» здесь, однако нам нужно добавить в начало "?", т.к. он нам нужен для запроса, но не возвращается в queryString. Теперь мы видим все наши параметры сортировки пицц и страницу в адресной строке браузера. ↑
// 15.6.1 Добавим проверку, что если это первый рендер, то пропускать обновление адресной строки.
  React.useEffect(() => {
    // If this is the FIRST render, do not update the URL.
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryName,
        sortingTypeId,
        sortingDirection,
        currentPage
      })

      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryName, sortingTypeId, sortingDirection, currentPage, navigate])

  const pizzasArr = items.map(item => <PizzaBlock key={item.title} {...item} />)
  const skeletonsArr = [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sorting/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletonsArr : pizzasArr}</div>
      <Pagination totalPages={totalPages} onChangePage={num => dispatch(setPageNumber(num))}/>
    </div>
  )
}

export default Home