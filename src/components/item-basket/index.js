import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import numberFormat from "../../utils/number-format";
import './styles.css';

function ItemBasket({item, onClose}) {
  return (
    <div className='ItemBasket'>
      <div className='ItemBasket__number'>{item._key}</div>
      <div className='ItemBasket__title'>
        <Link to={`/${item._id}`} onClick={onClose}>{item.title}</Link>
      </div>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
