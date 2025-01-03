import {useState} from "react";

export default function Categories() {
// ТЗ: Сделать, чтобы при клике на каждую из категорий ей бы выставлялся класс "active". Примем, что у каждой категории есть свой индекс, как у элементов массива и изначальное значение будет 0, т.е. категория "Все".
  const [activeIndex, setActiveIndex] = useState(0)

  const onClickCategory = (index) => setActiveIndex(index)

  // Сделаем рендеринг категорий из массива при помощи метода map.
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

  // Далее мы создадим анонимную стрелочную функцию, которая будет вызывать функцию onClickCategory и передадим в ней индекс каждого из элементов.
  return (
    <div className="categories">
      <ul>
        {
          categories.map((name, index) => (
              <li
                onClick={() => onClickCategory(index)}
                key={index}
                className={activeIndex === index ? 'active' : ''}
              >{name}</li>
            )
          )
        }
      </ul>
    </div>
  )
}