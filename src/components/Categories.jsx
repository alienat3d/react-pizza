import PropTypes from "prop-types";

// 9.0.2 Теперь мы передаём в пропсы функции Categories value & кастомную функцию onChangeCategory.
// (go to [Home.jsx])
// 9.1.2 Здесь же в параметрах комп. Categories параметр "onChangeCategory" у нас является, по сути, placeholder'ом для анонимной коллбэк-функции внутри пропса "onChangeCategory", ...
export default function Categories({value, onChangeCategory}) {
	const categories = ['Все', 'Новинки', 'Мясо', 'Вегетарианские', 'Гриль', 'Острые', 'Курица']
  const categoriesEnWords = ['all', 'new', 'meaty', 'vegetarian', 'grill', 'spicy', 'chicken']

  // Создадим функцию, которая будет переводить индексы категорий в английские слова для наглядности и уже их мы будем передавать родительскому компоненту
  const categoryIndexToWord = (index) => categoriesEnWords[index]

	return (
		<div className="categories">
      {/* 9.1.3 ... которая, в свою очередь, передаётся в слушатель события по клику и забирает в себя index, который также будет "id" в комп. Home. Этот "id" в итоге попадёт в стейт "categoryId" и будет использоваться в запросах к серверу для сортировки пицц. */}
      {/* (go to [Home.jsx]) */}
			<ul>
				{
					categories.map((name, index) => (
						<li
							key={index}
							onClick={() => onChangeCategory(categoryIndexToWord(index))}
							className={categoriesEnWords.indexOf(value) === index ? 'active' : ''}
						>{name}</li>
					)
					)
				}
			</ul>
		</div>
	)
}

Categories.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};