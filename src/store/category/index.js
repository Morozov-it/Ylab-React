import StoreModule from "../module";

class CategoryStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      countries: []
    };
  }

  /**
   * Загрузка категорий товаров
   */
  async loadCategories(){
    try {
      const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
      const json = await response.json();
      //это исключение ошибок, инструкции после throw не будут выполнены, а ход функции будет передан в catch
      if (json.error) throw new Error(json.error);

      this.updateState({
        items: json.result.items
      });

    } catch (e){
      this.updateState({
        items: []
      });
    }
  }
  async loadCountries(){
    try {
      const response = await fetch(`/api/v1/countries?limit=*&skip=0`);
      const json = await response.json();
      //это исключение ошибок, инструкции после throw не будут выполнены, а ход функции будет передан в catch
      if (json.error) throw new Error(json.error);

      this.updateState({
        countries: json.result.items
      });

    } catch (e){
      this.updateState({
        countries: []
      });
    }
  }
}

export default CategoryStore;
