import React from 'react'
import PropTypes from "prop-types"
import Categories from "/src/components/Categories.jsx"
import Sorting from "/src/components/Sorting.jsx"
import PizzaBlock from "/src/components/PizzaBlock"
import Skeleton from "/src/components/PizzaBlock/Skeleton.jsx"
import Pagination from "/src/components/Pagination/index.jsx";

export const Home = ({searchValue}) => {
  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  const LIMIT_PER_PAGE = 8
  const [totalPages, setTotalPages] = React.useState(0)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // 9.0.0 Итак, здесь мы поработаем с категорией и сортировкой. Для этого нам нужно как-то связать этот родительский компонент Home с компонентами Categories & Sorting. Чтобы это сделать мы создадим здесь дополнительно два стейта для каждого из них. Тогда мы сможем передавать некие параметры, получаемые из них в стейт, в запрос на сервер для нужной нам сортировки пицц. ↓
  // ? 9.1.0 Итак, рассмотрим подробно как работает передача id в стейт родительского компонента "categoryId" из комп. Categories. ↓
  // const [categoryId, setCategoryId] = React.useState(0)
  // Логично будет также изменить название стейта, т.к. теперь у нас не ID, а слово — название категории
  const [categoryName, setCategoryName] = React.useState('all')
  const [sortingType, setSortingType] = React.useState(0)
  const [sortingDirection, setSortingDirection] = React.useState('asc')
  // 10.11.1 Нам также пригодится стейт для хранения номера страницы. ↓
  const [currentPage, setCurrentPage] = React.useState(1)

  /* Делаем простой запрос без фильтров, чтобы получить общее количество пицц в БД и рассчитаем сколько потребуется страниц для отображения верной пагинации. */
  React.useEffect(() => {
    fetch(URL + '/items')
      .then(res => res.json())
      .then(data => {
        const pages = Math.ceil(data.length / LIMIT_PER_PAGE)
        setTotalPages(pages)
      })
      .catch(err => {
        console.error('Ошибка получения количества:', err);
      });
  }, []);

  // Напишем функцию, которая будет в зависимости от слова поступающего в неё генерировать нужный путь для fetch.
  // 10.11.0 Теперь нам нужно добавить в генерацию ссылки запрос пагинации, где будет указано сколько элементов нужно отображать на 1 странице ("limit") и с какой страницы начинать ("page").
  const generateLink = (categoryName, sortingType, sortingDirection, searchValue, currentPage) => {
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
    switch (sortingType) {
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

    console.log(link)

    return link
  }
  // link += '&order=desc'

  // 9.2 Теперь в fetch мы должны изменить ссылку, добавив динамически генерируемый через стейт запрос. А также нам нужно указать в зависимостях "useEffect" следить за стейтом "categoryId", чтобы он обновлял fetch всякий раз, когда значение стейта изменится.
  React.useEffect(() => {
    setIsLoading(true)

    fetch(generateLink(categoryName, sortingType, sortingDirection, searchValue, currentPage))
      .then(response => response.json())
      .then(data => setItems(data))
      .then(() => setIsLoading(false))

    window.scrollTo(0, 0)
  }, [categoryName, sortingType, sortingDirection, searchValue, currentPage])
  // }, [categoryId])

  // 10.6 Здесь требуется небольшой рефакторинг, для которого создадим две переменных с массивами для пицц и скелетонов и вставим их в цикл перебора.
  // 10.7 После этого мы с помощью метода filter сделаем проверку, сравнив введённые в поиск буквы с названиями пицц и т.о. отрендерим только те, что содержат эти буквы. Но предварительно мы переведём и названия и ввод в нижний регистр для лучшей совместимости.
  // 10.8 Этот поиск быстр и хорош, но подходит лишь для статичных (не изменяющихся и обычно небольших) массивов. Но для более объёмных и динамически меняющихся массивов (или где требуется проверка на актуальность) этот метод не подойдёт. Теперь мы рассмотрим поиск при помощи бэкэнда. ↑
  /*const pizzasArr = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(item => <PizzaBlock key={item.title} {...item} />)*/
  const pizzasArr = items.map(item => <PizzaBlock key={item.title} {...item} />)
  const skeletonsArr = [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>)

  return (
    <div className="container">
      <div className="content__top">
        {/* 9.0.1 Дальше мы должны передать стейты в дочерние компоненты через пропсы. */}
        {/* (go to [Categories.jsx]) */}
        {/* 9.1.1 Сперва мы формируем пропс с анонимной коллбэк-функцией внутри, куда передаём функцию изменения стейта setCategoryId, куда аргументом передаём id из комп. Categories. */}
        {/* (go to [Categories.jsx]) */}
        {/*<Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>*/}
        <Categories value={categoryName} onChangeCategory={(name) => setCategoryName(name)}/>
        <Sorting value={sortingType}
                 valueBtn={sortingDirection}
                 onChangeSorting={(id) => setSortingType(id)}
                 onClickBtn={(str) => setSortingDirection(str)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletonsArr : pizzasArr}</div>
      {/* 10.11.2 Далее мы будем через кастомное событие передавать номер страницы из комп. Pagination. */}
      {/* (go to [Pagination.jsx]) */}
      <Pagination totalPages={totalPages} onChangePage={num => setCurrentPage(num)}/>
    </div>
  )
}

Home.propTypes = {
  searchValue: PropTypes.string.isRequired,
}