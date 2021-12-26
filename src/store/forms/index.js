import StoreModule from "../module";

class FormsStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      _id: "",
      title: "",
      description: "",
      price: undefined,
      maidIn: '',
      edition: undefined,
      category: '',
      error: null,
      waiting: true
    };
  }
  /**
   * Загрузка данных конкретного товара
   */
  async loadItem(id){
    //это сброс (обновление) текущего состояния
    this.updateState({
      _id: "",
      title: "",
      description: "",
      price: undefined,
      maidIn: '',
      edition: undefined,
      category: '',
      error: null,
      waiting: true
    });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      //это исключение ошибок, инструкции после throw не будут выполнены, а ход функции будет передан в catch
      if (json.error) throw new Error(json.error);
      this.updateState({
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        maidIn: json.result.maidIn._id,
        edition: json.result.edition,
        category: json.result.category._id,
        error: json.error,
        waiting: false
      });
    } catch (e){
      this.updateState({
        _id: "",
        title: "",
        description: "",
        price: undefined,
        maidIn: '',
        edition: undefined,
        error: e.message,
        category: '',
        waiting: true
      });
    }
  }
  /**
   * Метод для контролируемых полей input
   */
  changeItem(prop, value) {
    if (prop === 'title') this.updateState({ title: value});
    if (prop === 'description') this.updateState({ description: value });
    if (prop === 'price') this.updateState({ price: value });
    if (prop === 'maidIn') this.updateState({ maidIn: value });
    if (prop === 'category') this.updateState({ category: value });
    if (prop === 'edition') this.updateState({ edition: value });
    if (prop === 'price') this.updateState({ price: value });
    //console.log(this.getState())
  }
  /**
   * Отправка введенных данных на сервер
   */
  async sendItem(id) {
    const data = {
      _id: this.getState()["_id"],
      title: this.getState().title,
      description: this.getState().description,
      price: this.getState().price,
      maidIn: {
        _id: this.getState().maidIn
      },
      edition: this.getState().edition,
      category: {
        _id: this.getState().category
      }
    };
    try {
      const response = await fetch(`/api/v1/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data), // преобразование данных в формат JSON
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (json.result) {
        alert(`Товар ${json.result.title} обновлен!`);
        this.loadItem(id);
      }
      //console.log('Успех:', json);

      if (json.error) {
        this.updateState({ error: json.error });
        console.error('Ошибка:', json.error.message);
        // throw new Error(json.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}

export default FormsStore;
