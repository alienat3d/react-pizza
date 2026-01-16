import ReactPaginate from 'react-paginate'

import styles from "./Pagination.module.scss"
import PropTypes from "prop-types";

// 10.11.3 Передадим onChangePage в пропсы Pagination, чтобы связать с родительским.
// ? В тех местах, где мы передаём пропсы компоненту из родительского... ↓
export const Pagination = ({totalPages, onChangePage}) => {
  return (
    <>
      {/* 10.10 Займёмся пагинацией, для чего установим плагин "react-paginate" (https://www.npmjs.com/package/react-paginate). Он нам сформирует список ul со ссылками и кнопками навигации, которые мы потом стилизуем в [Pagination.module.scss]. */}
      {/* (Go to [Home.jsx]) */}
      {/* 10.11.4 Нам известно, что событие "onPageChange" возвращает номер страницы (точнее его свойство "selected"), его нам нужно передать в род. компонент для корректного отображения. Однако возвращает он начиная с 0, а нам нужно с 1. */}
      {/* 10.11.5 В pageCount мы передаём из стейта totalPages количество страниц для отображения пунктов пагинации, которое рассчитывается из расчёта длина массива / кол-во отображаемых элементов на странице. */}
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=""
        previousLabel=""
        onPageChange={evt => onChangePage(evt.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pagination

// ? ... линтер нас попросит записать типы для них.
Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
}