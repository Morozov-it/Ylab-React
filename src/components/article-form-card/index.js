import React from 'react';
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname'
import './styles.css';

function ArticleFormCard({article, countries, categories, onItem, onSend}) {
  // CSS классы по БЭМ
  const className = cn('ArticleFormCard');

  const inputHadler = (e) => {
    onItem(e.target.name, e.target.value);
  }

  return (
    <form className={className()}>
      <div className={className('Test')}>
        <label>Название</label><br />
        <input name={'title'} value={article.title} onChange={inputHadler}/>
      </div>
      <div className={className('Description')}>
        <label>Описание</label><br />
        <textarea name={'description'} value={article.description} onChange={inputHadler}/>
      </div>
      <div className={className('Country')}>
        <label>Страна производитель</label><br />
        <select name={'maidIn'} onChange={inputHadler}>
          {countries.map(item => (
          <option key={item._key} value={item._id}>{item.title}</option>))}
        </select>
      </div>
      <div className={className('Category')}>
        <label>Категория</label><br />
        <select name={'category'} onChange={inputHadler}>
          {categories.map(item => (
          <option key={item._id} value={item._id}>{item.title}</option>))}
        </select>
      </div>
      <div className={className('Edition')}>
        <label>Год выпуска</label><br />
        <input name={'edition'} onChange={inputHadler} value={article.edition}/>
      </div>
      <div className={className('Price')}>
        <label>Цена</label><br />
        <input name={'price'} onChange={inputHadler} value={article.price}/>
      </div>
      {article.error && 
        <div className={className('Error')}>
          <strong>{article.error.message}</strong><br />
          <span>В поле {article.error.data.issues[0].path} {article.error.data.issues[0].message}</span>
        </div>}
      <button
        onClick={(e) => {
          e.preventDefault();
          onSend(article['_id']);}
        }>Сохранить</button>
    </form>
  )
}

ArticleFormCard.propTypes = {
  article: propTypes.object.isRequired,
  countries: propTypes.array,
  categories: propTypes.array,
  onAdd: propTypes.func,
  onSend: propTypes.func,
}

ArticleFormCard.defaultProps = {
  article: {},
  countries: [],
  categories: [],
  onAdd: () => { },
  onSend: () => {}
}

export default React.memo(ArticleFormCard);
