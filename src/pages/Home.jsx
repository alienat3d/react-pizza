import React from 'react'
import Categories from "/src/components/Categories.jsx"
import Sorting from "/src/components/Sorting.jsx"
import PizzaBlock from "/src/components/PizzaBlock"
import Skeleton from "/src/components/PizzaBlock/Skeleton.jsx"

export const Home = () => {
  const URL = 'https://6952a95b3b3c518fca135a9c.mockapi.io'
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // 9.0.0 Итак, здесь мы поработаем с категорией и сортировкой. Для этого нам нужно как-то связать этот родительский компонент Home с компонентами Categories & Sorting. Чтобы это сделать мы создадим здесь дополнительно два стейта для каждого из них. Тогда мы сможем передавать некие параметры, получаемые из них в стейт, в запрос на сервер для нужной нам сортировки пицц. ↓
  // ? 9.1.0 Итак, рассмотрим подробно как работает передача id в стейт родительского компонента "categoryId" из комп. Categories. ↓
  // const [categoryId, setCategoryId] = React.useState(0)
  // Логично будет также изменить название стейта, т.к. теперь у нас не ID, а слово — название категории
  const [categoryName, setCategoryName] = React.useState('all')
  const [sortingType, setSortingType] = React.useState(0)
  const [sortingDirection, setSortingDirection] = React.useState('asc')

  // Напишем функцию, которая будет в зависимости от слова поступающего в неё генерировать нужный путь для fetch.
  const generateLink = (url, categoryName, sortingType, sortingDirection) => {
    let link = url + '/items'
    let params = []

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

    console.log(link)

    return link
  }
  // link += '&order=desc'

  // 9.2 Теперь в fetch мы должны изменить ссылку, добавив динамически генерируемый через стейт запрос. А также нам нужно указать в зависимостях "useEffect" следить за стейтом "categoryId", чтобы он обновлял fetch всякий раз, когда значение стейта изменится.
  React.useEffect(() => {
    setIsLoading(true)

    fetch(generateLink(URL, categoryName, sortingType, sortingDirection))
      .then(response => response.json())
      .then(data => setItems(data))
      .then(() => setIsLoading(false))

    window.scrollTo(0, 0)
  }, [categoryName, sortingType, sortingDirection])
  // }, [categoryId])

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
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>) :
            items.map(item => <PizzaBlock key={item.title} {...item} />)
        }
      </div>
    </div>
  )
}