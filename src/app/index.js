import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
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

  //попытка сделать вложенные роуты чтобы не дублировать модальное окно корзины на каждой странице
  // const Wrapper = () => {
  //   return (
  //     <>
  //       <Outlet />
  //       {select.name === 'basket' && <Basket />}
  //     </>
  //   )
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <><Main />
            {select.name === 'basket' && <Basket />}
          </>} />
        <Route path="/:id" element={
          <><ItemDescribe />
            {select.name === 'basket' && <Basket />}
          </>} />
        <Route path="/*" element={<div>Notfound Page</div> }/>
      </Routes>
      
      {/*попытка сделать вложенные роуты чтобы не дублировать модальное окно корзины на каждой странице*/}
      {/* <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Main />} />
          <Route path=":id" element={<ItemDescribe />} />
          <Route path="*" element={<div>Notfound Page</div> }/>
        </Route>
      </Routes> */}
    </>
  );
}

export default React.memo(App);
