import StoreModule from "../module";

class DescribeStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: {}
    };
  }

  async loadItem(id) {
    //получение описания
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    // Установка состояния describe
    this.setState({
      item: json.result
    });
    console.log(this.getState())
  };
}

export default DescribeStore;
