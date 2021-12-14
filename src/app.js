import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  const [active, setActive] = useState(false); //переменная для состояния модального окна

  const callbacks = {
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onAddItem: useCallback((code) => store.addItemToBasket(code), [store])
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls setActive={setActive}
        basket={store.getState().basket}
        basketSum={store.getState().basketSum}
      />
      <List items={store.getState().items}
        onSelectItem={callbacks.onSelectItem}
        onAddItem={callbacks.onAddItem} />
      <Modal active={active}
        setActive={setActive}
        basket={store.getState().basket}
        basketSum={store.getState().basketSum} />
    </Layout>
  );
}

export default App;