import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById("app");

// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Goods', cost: 100, count: 1},
    {code: 2, title: 'React book', cost: 770, count: 1},
    {code: 3, title: 'Bread', cost: 43, count: 1},
    {code: 4, title: 'Tractor', cost: 7654320, count: 1},
    {code: 5, title: 'Iphone XI', cost: 121000, count: 1},
    {code: 6, title: 'Color pens', cost: 111, count: 1},
    {code: 7, title: 'Surprise', cost: 0, count: 1}
  ],
  basket: []
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store}/>, root);
