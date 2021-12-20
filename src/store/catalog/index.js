import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      currentPage: 1,
      limit: 10,
      countItems: null,
    };
  }

  /**
   * Загрузка списка товаров
   */

  async load(currentPage) {
    let skip = (currentPage * 10) - 10;
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      countItems: json.result.count,
      limit: this.getState().limit,
      currentPage
    });
  }
}

export default CatalogStore;
