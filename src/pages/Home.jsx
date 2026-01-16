import React from 'react'
import axios from "axios"
import Categories from "/src/components/Categories.jsx"
import Sorting from "/src/components/Sorting.jsx"
import PizzaBlock from "/src/components/PizzaBlock"
import Skeleton from "/src/components/PizzaBlock/Skeleton.jsx"
import Pagination from "/src/components/Pagination/index.jsx"

// import {SearchContext} from "../App.jsx"
import {useDispatch, useSelector} from 'react-redux'
import {setPageNumber} from "/src/redux/slices/paginationSlice.js"

const Home = () => {
  // 13.2.0 Теперь здесь, по аналогии с React Context, мы можем использовать хук Redux "useSelector". С помощью него мы вытащим стейт. Делаем это в виде функции и говорим Реакту, что мы хотим вытащить из стейта что-то определённое, а именно просим Реакт нам достать из общего хранилища Redux из слайса "filter" данные из стейта.
  // const categoryName = useSelector((state) => state.filter.categoryName)
  // const sortingDirection = useSelector((state) => state.filter.sortingDirection)
  // const sortingType = useSelector((state) => state.filter.sortingTypeId)
  const {categoryName, sortingDirection, sortingTypeId} = useSelector((state) => state.filter)
  const currentPage = useSelector((state) => state.pagination.pageNumber)
  const searchValue = useSelector((state) => state.search.inputValue)
  // 13.3.0 Мы также импортируем и используем функцию "dispatch" для передачи имени новой категории, по которой кликнул пользователь. ↓
  const dispatch = useDispatch()

  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  const LIMIT_PER_PAGE = 8
  const [totalPages, setTotalPages] = React.useState(0)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // const {searchValue} = React.useContext(SearchContext)

  // 13.2.1 Далее нам нужно заменить "setCategoryName" нашей собственной функцией, которая будет принимать тип сортировки из "sortingType".
  // 13.3.1 Здесь мы обернём в "dispatch" импортированную из слайса функцию "setCategoryName".
  // (Go to [/components/Sorting.js])
  // const onChangeSortingType = (id) => dispatch(setCategoryName(id))

  // const [categoryName, setCategoryName] = React.useState('all')
  // const [sortingType, setSortingType] = React.useState(0)
  // const [sortingDirection, setSortingDirection] = React.useState('asc')
  // const [currentPage, setCurrentPage] = React.useState(1)

// 14.0 Для более удобной работы с запросами установим и используем специальную библиотеку "axios" (npm i axios). Теперь перепишем метод fetch на axios.
  /*React.useEffect(() => {
    fetch(URL + '/items')
      .then(res => res.json())
      .then(data => {
        const pages = Math.ceil(data.length / LIMIT_PER_PAGE)
        setTotalPages(pages)
      })
      .catch(err => {
        console.error('Ошибка получения количества:', err);
      });
  }, []);*/
  // 14.1.0 "axios" многим выгодно отличается, например тем, что с ним мы можем пропустить шаг перевода данных из json в объект JS методом "json", а сразу приступить к обработке данных в следующем же чейне после их получения. ↓
  React.useEffect(() => {
    axios.get(URL + '/items')
      .then(response => {
        const pages = Math.ceil(response.data.length / LIMIT_PER_PAGE)
        setTotalPages(pages)
      },
      error => console.error(error)
    )
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

    // 10.9 Честно говоря, поиск в MockAPI, хотя и работает, но довольно странно, точнее работает сам по себе, но не в сочетании с фильтрами.
    // (go to [Pagination/index.jsx])
    // TODO: Разобраться с поиском (возможно вернуться на JS-поиск по массиву данных.
    if (searchValue) {
      link += `&search=${searchValue}`
    }

    return link
  }

  // 14.1.1 Также мы продолжим рефакторинг и здесь.
  // (Go to [/Search/index.jsx])
  /*React.useEffect(() => {
    setIsLoading(true)

    fetch(generateLink(categoryName, sortingTypeId, sortingDirection, searchValue, currentPage))
      .then(response => response.json())
      .then(data => setItems(data))
      .then(() => setIsLoading(false))

    window.scrollTo(0, 0)
  }, [categoryName, sortingTypeId, sortingDirection, searchValue, currentPage])*/
  React.useEffect(() => {
    setIsLoading(true)

    axios.get(generateLink(categoryName, sortingTypeId, sortingDirection, searchValue, currentPage))
      .then(response => setItems(response.data),
        error => console.error(error))
      .then(() => setIsLoading(false))
  }, [categoryName, sortingTypeId, sortingDirection, searchValue, currentPage])

  const pizzasArr = items.map(item => <PizzaBlock key={item.title} {...item} />)
  const skeletonsArr = [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>)

  return (
    <div className="container">
      <div className="content__top">
        {/*13.2.1:*/}
        {/*<Categories value={categoryName} onChangeCategory={(name) => setCategoryName(name)}/>*/}
        <Categories/>
        {/*<Sorting value={sortingType}
                 valueBtn={sortingDirection}
                 onChangeSorting={(id) => setSortingType(id)}
                 onClickBtn={(str) => setSortingDirection(str)}/>*/}
        <Sorting/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletonsArr : pizzasArr}</div>
      <Pagination totalPages={totalPages} onChangePage={num => dispatch(setPageNumber(num))}/>
    </div>
  )
}

export default Home