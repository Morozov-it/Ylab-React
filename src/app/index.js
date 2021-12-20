import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ItemDescribe from './itemDescribe';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<ItemDescribe />} />
        <Route path="/*" element={<div>Notfound Page</div> }/>
      </Routes>
      {select.name === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
