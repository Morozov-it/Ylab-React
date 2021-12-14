import React from "react";
import './styles.css';

function Modal({ active, setActive, basket }) {
  console.log(basket)
  // let basketFilter = basket.filter((item, index) => {
  //   return basket.indexOf(item) === index
  // });
  let basketFilter = basket.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.code === item.code))
  )
  console.log(basketFilter)

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()//отключение клика в области модального окна
      }>
        <div className='modal-head'>
          <h1>Корзина</h1>
          <button onClick={() => setActive(false)}>Закрыть</button>
        </div>
        <div className='modal-list'>{basketFilter.map((item, index) =>
          <div className='list-item' key={index}>
            <Item item={item} index={index} basket={basket}/>
          </div>)}
        </div>
        {basket.length === 0 ? null :
          <div className='modal-total'>
            <b>Итого:</b>
            <b>{basket.reduce((acc, elem) => {
              return acc + elem.cost
            }, 0).toLocaleString()} &#8381;</b>
            <b>{basket.reduce((acc, elem) => {
              return acc + elem.count
            }, 0)} шт</b>
          </div>}
      </div>
    </div>
  )
};

function Item({item, index, basket}){
  return (
    <div className='item'>
      <div className='item__number'>{index + 1}</div>
      <div className='item__title'>{item.title}</div>
      <div className='item__cost'>{item.cost.toLocaleString()} &#8381;</div>
      <div className='item__count'>{item.count} шт</div>
    </div>
  )
};


export default React.memo(Modal);