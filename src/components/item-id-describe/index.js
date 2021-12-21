import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";

function ItemIdDescribe({ item, onAdd }) {
  return (
    <div className='item__body'>
      <div className='item__info'>{item.description}</div>
      <div className='item__info'>
        <span>Страна производитель: </span>
        <strong>{item.maidIn.title + "(" + item.maidIn.code + ")"}</strong>
      </div>
      <div className='item__info'>
        <span>Категория: </span>
        <strong>{item.category.title}</strong>
      </div>
      <div className='item__info'>
        <span>Год выпуска: </span>
        <strong>{item.edition}</strong>
      </div>
      <div className='item__info'>
        <div>
          <h2>
            <span>Цена: </span>
            <span>{numberFormat(item.price)} ₽</span>
          </h2>
        </div>
        <button onClick={() => onAdd(item._id)}>Добавить</button>
      </div>
    </div>
  )
}

ItemIdDescribe.propTypes = {
  item: propTypes.object,
  onAdd: propTypes.func,
}

ItemIdDescribe.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ItemIdDescribe);
