import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({ countItems, limit, currentPage, onPageChanged }) {
  let pages = Math.ceil( countItems / limit );
  const setPages = () => {
    let pagesArray = [];
    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i)
    }
    return pagesArray
  };

  return (
    <div className='body'>
        {setPages().map(p => {
          return (
            <span
              className={currentPage === p ? 'selected item' : 'item'}
              onClick={() => onPageChanged(p)}
              key={p}>{p}</span>
          )
        })}
      </div>
  );
}

Pagination.propTypes = {
  countItems: propTypes.number,
  currentPage: propTypes.number,
  onPageChanged: propTypes.func
}

Pagination.defaultProps = {
  onPageChanged: (p) => {console.log(`page ${p}`)}
}

export default React.memo(Pagination);
