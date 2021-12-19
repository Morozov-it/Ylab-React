import React, {useCallback, useEffect, useState} from "react";
import BasketSimple from "../../components/basket-simple";
import LayoutDescribe from "../../components/layout-describe";
import ItemIdDescribe from "../../components/item-id-describe";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { useParams } from "react-router-dom";

function ItemDescribe() {
  //получение параметра id из запроса
  const { id } = useParams();

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount
  }));

  const [item, setItem] = useState(null);

  // Загрузка данных товара при первом рендере
  useEffect(async () => {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    setItem(json.result);
  }, [id]);

  const store = useStore();
  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  return (
    <LayoutDescribe head={<h1>{item && item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      {item && <ItemIdDescribe item={item} onAdd={callbacks.addToBasket} />}
    </LayoutDescribe>
  )
}

export default React.memo(ItemDescribe);
