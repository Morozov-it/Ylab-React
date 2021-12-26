import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import ArticleFormCard from "../../components/article-form-card";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";

function ArticleForm() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.get('article').load(params.id);
    await store.forms.loadItem(params.id);
    await store.category.loadCategories();
    await store.category.loadCountries();
  }, [params.id]);

  const select = useSelector(state => ({
    title: state.article.data.title,
    article: state.forms,
    waiting: state.forms.waiting,
    categories: state.category.items,
    countries: state.category.countries,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    onSend: useCallback((id) => store.forms.sendItem(id), [store]),
    onItem: useCallback((prop, value) => store.forms.changeItem(prop, value), [store]),
  }

  return (
    <Layout head={<h1>{select.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleFormCard
          article={select.article}
          countries={select.countries}
          categories={select.categories}
          onItem={callbacks.onItem}
          onSend={callbacks.onSend}
          onAdd={callbacks.addToBasket} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleForm);
