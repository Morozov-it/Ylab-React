import React, {useCallback, useEffect} from "react";
import BasketSimple from "../../components/basket-simple";
import LayoutDescribe from "../../components/layout-describe";
import ItemIdDescribe from "../../components/item-id-describe";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { useParams } from "react-router-dom";

function ItemDescribe() {
  
  // //получение параметра id из запроса
  const { id } = useParams();

  //нужен для вызова действий
  const store = useStore();

  //подписывается компонента на изменение state только определенных данных в store (модулей)
  const select = useSelector(state => ({
    item: state.describe.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  // Загрузка данных товара при первом рендере
  useEffect(async () => {
    await store.get('describe').loadItem(id);
  }, [id]);

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }
  return (
    <LayoutDescribe head={<h1>{select.item.title}</h1>} >
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <ItemIdDescribe item={select.item} onAdd={callbacks.addToBasket} />
    </LayoutDescribe >
  )
}

export default React.memo(ItemDescribe);
