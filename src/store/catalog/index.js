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
      countItems: 0,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=0&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      countItems: json.result.count,
      currentPage: 1
    });
  }

  //обновление страниц списка товаров
  async setCurrentPage(currentPage) {
    let skip = (currentPage * 10) - 10;
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      currentPage
    });
    console.log(this.getState().items);
  }
}

export default CatalogStore;
