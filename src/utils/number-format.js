export default function numberFormat(value, options = {}){
  return new Intl.NumberFormat('ru-RU', options).format(value)
}// функция для отображения цены в рублях, это вызов интерфейса браузера для интернационализации