import React  from "react";
import plural from 'plural-ru';
import './styles.css';

function Controls({ setActive, basket }) {
  return <div className='Controls'>
    <div className='text'>
      <span>В корзине: {basket.length === 0 //проверка наличия товаров в корзине
        ? <b>пусто</b>
        : <b>{basket.length} {plural(basket.length, 'товар', 'товара', 'товаров')} / {basket.reduce((acc, elem) => {
          return acc + elem.cost
        }, 0).toLocaleString() //сумма стоимости товаров в корзине
          } &#8381;</b>}</span>
    </div>
    <div className='button'>
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  </div>
}


export default React.memo(Controls);