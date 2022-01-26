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
    await store.forms.loadItem(params.id);
    await store.category.loadCategories();
    await store.category.loadCountries();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.forms,
    waiting: state.forms.waiting,
    categories: state.category.items,
    countries: state.category.countries,
  }));

  const callbacks = {
    onSend: useCallback((id) => store.forms.sendItem(id), [store]),
    onInput: useCallback((prop, value) => store.forms.changeItem(prop, value), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleFormCard
          article={select.article}
          countries={select.countries}
          categories={select.categories}
          onInput={callbacks.onInput}
          onSend={callbacks.onSend} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleForm);
