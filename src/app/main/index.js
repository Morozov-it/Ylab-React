import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main() {

  // получаем нужные части из Store (аналог mapStateToProps в Redux)
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    //receive store for pagination
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    countItems: state.catalog.countItems
  }));

  //получаем Store для вызова методов в Store
  const store = useStore();

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(1);
  }, []);

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    onPageChanged: useCallback((p) => store.catalog.load(p), [store]),
  };

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        countItems={select.countItems}
        limit={select.limit}
        currentPage={select.currentPage}
        onPageChanged={callbacks.onPageChanged}
      />
    </Layout>
  );
}

export default React.memo(Main);
