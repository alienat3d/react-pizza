import React from 'react'
import axios from "axios"
import qs from "qs"
import {useNavigate} from "react-router"
import {useDispatch, useSelector} from 'react-redux'
import {setFilters, setPageNumber} from "/src/redux/slices/filterSlice.js"
import {fetchPizzas} from "/src/redux/slices/pizzasSlice.js"

import Categories from "/src/components/Categories.jsx"
import Sorting from "/src/components/Sorting.jsx"
import PizzaBlock from "/src/components/PizzaBlock"
import Skeleton from "/src/components/PizzaBlock/Skeleton.jsx"
import Pagination from "/src/components/Pagination/index.jsx"

const Home = () => {
  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  const LIMIT_PER_PAGE = 8

  const {categoryName, currentPage, sortingDirection, sortingTypeId} = useSelector((state) => state.filter)
  const searchValue = useSelector((state) => state.search.inputValue)
  // 17.0 Здесь мы проведём рефакторинг кода и вынесем всё, связанное с запросами на сервер в Redux хранилище "pizzasSlice.js".
  // (Go to [/slices/pizzasSlice.js])
  const {status, items} = useSelector((state) => state.pizzas)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const link = React.useRef('')
  const isMounted = React.useRef(false)
  const isSearch = React.useRef(false)

  const [totalPages, setTotalPages] = React.useState(0)
  // const [items, setItems] = React.useState([])
  // 17.2.0 Здесь у нас ещё была стейт загрузки, которую мы тоже можем вынести в Редакс.
  // (Go to [/redux/slices/pizzaSlice.js])
  // const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get(URL + '/items')
      .then(response => {
          const pages = Math.ceil(response.data.length / LIMIT_PER_PAGE)
          setTotalPages(pages)
        },
        error => console.error(error)
      )
  }, [])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      dispatch(setFilters(params))

      isSearch.current = true
    }
  }, [])

  const generateLink = (categoryName, sortingTypeId, sortingDirection, searchValue, currentPage) => {
    link.current = URL + '/items'
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
    if (params.length > 0) link.current += '?' + params.join('&')

    // Честно говоря, поиск в MockAPI, хотя и работает, но довольно странно, точнее работает сам по себе, но не в сочетании с фильтрами.
    // TODO: Разобраться с поиском (возможно вернуться на JS-поиск по массиву данных.
    if (searchValue) {
      link.current += `&search=${searchValue}`
    }
  }
  generateLink(categoryName, sortingTypeId, sortingDirection, searchValue, currentPage)

  React.useEffect(() => {
    if (isSearch.current) {
      isSearch.current = false
      return
    }

    // setIsLoading(true)

    /*axios.get(generateLink(categoryName, sortingTypeId, sortingDirection, searchValue, currentPage))
      .then(response => dispatch(setItems(response.data)),
        error => console.error(error))
      .then(() => setIsLoading(false))*/
    // 17.1.4 Теперь здесь мы уже просто будем вызывать асинхронный экшен fetchPizzas для отправки запроса на сервер и получения/сохранения пицц. ↑

    /*try {
      dispatch(fetchPizzas(link.current))
    } catch (error) {
      console.error(error)
      alert('Ошибка при загрузке пицц')
    } finally {
      setIsLoading(false)
    }*/
    // 17.3 В принципе, конструкция try...catch стала здесь уже явно избыточной, т.к. это у нас уже реализовано в [pizzaSlice.js] с помощью extraReducers.
    dispatch(fetchPizzas(link.current))

    window.scrollTo(0, 0)
  }, [categoryName, sortingTypeId, sortingDirection, searchValue, currentPage])

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
      {
        status === "error" ? (
          <div>
            <h2 className="no-pizzas-title">Извините, но пиццы загрузить не удалось...</h2>
            <div className="no-pizzas-animation"></div>
          </div>
        ) : <div className="content__items">{status === 'loading' ? skeletonsArr : pizzasArr}</div>
      }
      {/*<div className="content__items">{isLoading ? skeletonsArr : pizzasArr}</div>*/}
      <Pagination totalPages={totalPages} onChangePage={num => dispatch(setPageNumber(num))}/>
    </div>
  )
}

export default Home