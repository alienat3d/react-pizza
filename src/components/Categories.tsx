import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {setCategoryName} from "../redux/slices/filterSlice"
import {RootState} from "../redux/store";

const categories:string[] = ['Все', 'Новинки', 'Мясо', 'Вегетарианские', 'Гриль', 'Острые', 'Курица']
const categoriesEnWords:string[] = ['all', 'new', 'meaty', 'vegetarian', 'grill', 'spicy', 'chicken']

const Categories: React.FC = () => {
  const {categoryName} = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch()

  // Создадим функцию, которая будет переводить индексы категорий в английские слова для наглядности и уже их мы будем передавать родительскому компоненту
  const categoryIndexToWord = (index: number) => categoriesEnWords[index]

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

export default Categories