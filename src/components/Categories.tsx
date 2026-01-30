import React from "react"
// import {useDispatch, useSelector} from "react-redux"
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {setCategoryName} from "../redux/slices/filterSlice"
// import {RootState} from "../redux/store"

// 25.0 Иногда нам может потребоваться оптимизация обновления некоторых частей нашего приложения для ускорения его загрузки. Здесь у нас части слишком простые и такая оптимизация выглядит очевидно избыточной, но всё равно рассмотрим как это делается и запретим обновлять компоненту категорий обновляться во время ввода в строку поиска.
// 25.1.0 Но, сперва нам нужно определить почему происходит это обновление. И в этом нам поможет метод специальной библиотеки хуков для Реакта "ahooks" (https://ahooks.js.org/). Здесь нас интересует конкретный хук «useWhyDidYouUpdate», который мы сюда импортируем. ↓
// import {useWhyDidYouUpdate} from 'ahooks'

const categories: string[] = ['Все', 'Новинки', 'Мясо', 'Вегетарианские', 'Гриль', 'Острые', 'Курица']
const categoriesEnWords: string[] = ['all', 'new', 'meaty', 'vegetarian', 'grill', 'spicy', 'chicken']

// 25.1.2 Но здесь нам больше подошло бы обернуть всю функцию, отвечающую за компонент Categories в «React.memo», это также предотвратит дополнительный ререндер компонента.
const Categories: React.FC = React.memo(() => {
        const {categoryName} = useAppSelector(state => state.filter)
        const dispatch = useAppDispatch()

        // Создадим функцию, которая будет переводить индексы категорий в английские слова для наглядности и уже их мы будем передавать родительскому компоненту
        const categoryIndexToWord = (index: number) => categoriesEnWords[index]

        // 25.1.1 Вызовем этот хук, в который мы передаём два параметра: 1) Компонент, в котором происходит перерисовка; 2) какие пропсы будут меняться. Это помогает дебажить перерисовку компонента. Но это, если бы мы использовали пропсы, то мы бы могли ту функцию, которая создаётся заново, при обновлении компонента, обернуть в хук "useCallback", чтобы она не обновлялась и остановила постоянный ререндер компонента. ↑
        // useWhyDidYouUpdate('Categories', {...props})

        return (
            <div className="categories">
                {/* 9.1.3 ... которая, в свою очередь, передаётся в слушатель события по клику и забирает в себя index, который также будет "id" в комп. Home. Этот "id" в итоге попадёт в стейт "categoryId" и будет использоваться в запросах к серверу для сортировки пицц. */}
                {/* (go to [Home.tsx]) */}
                <ul>
                    {
                        categories.map((name, index) => (
                                <li
                                    key={index}
                                    onClick={() => dispatch(setCategoryName(categoryIndexToWord(index)))}
                                    className={categoriesEnWords.indexOf(categoryName) === index ? 'active' : ''}
                                >{name}</li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }
)

export default Categories