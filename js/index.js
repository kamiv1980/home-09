'use strict'

const baking = [
  {
    id: 101,
    type: 'auto',
    amount: 14,
    title: 'Фруктовый пирог',
    subtitle: 'Очень вкусно)))',
    price: 90,
    currency: 'UAH',
    preview: 'images/1.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 102,
    type: 'auto',
    amount: 24,
    title: 'Кекс',
    subtitle: 'Очень вкусно)))',
    price: 10,
    currency: 'UAH',
    preview: 'images/2.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 103,
    type: 'auto',
    amount: 25,
    title: 'Булочка с маком',
    subtitle: 'Очень вкусно)))',
    price: 15,
    currency: 'UAH',
    preview: 'images/3.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 104,
    type: 'auto',
    amount: 13,
    title: 'Пицца',
    subtitle: 'Очень вкусно)))',
    price: 120,
    currency: 'UAH',
    preview: 'images/4.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 105,
    type: 'auto',
    amount: 23,
    title: 'Самса',
    subtitle: 'Очень вкусно)))',
    price: 18,
    currency: 'UAH',
    preview: 'images/5.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 106,
    type: 'auto',
    amount: 10,
    title: 'Сосика в тесте',
    subtitle: 'Очень вкусно)))',
    price: 18,
    currency: 'UAH',
    preview: 'images/6.jpg',
    description: 'Hokkaido Flower',
  },
]

const listBaking = document.querySelector('.js-gallery')
const modal = document.querySelector('div.lightbox')
const button = document.querySelector('button[data-action="close-lightbox"]')
const toBasket = document.querySelector('.btn-toBasket')
const imgModal = modal.querySelector('.card-img-top')
const title = modal.querySelector('.card-title')
const price = modal.querySelector('.card-text')
const overlay = modal.querySelector('.lightbox__overlay')
const basket = document.querySelector('.list-basket')
const sum = document.querySelector('.totalSum')
const btnClearBasket = document.querySelector('.clear-basket')
const btnSearch = document.querySelector('.btn-outline-success')
const inputSearch = document.querySelector('.me-2')

let target
let string = ''
let totalSum = null
let priceEl = 0
let amountEl = 0
let titleEl = ''

function fill() {
  listBaking.previousElementSibling.textContent = 'Выпечка'
  baking.forEach(
    (el) =>
      (string += `<li><div class="card" style="width: 18rem;">
    <img src="${el.preview}" class="card-img-top" alt="${el.description}" width ="200" height="150">
    <div class="card-body">
      <h5 class="card-title">${el.title}</h5>
      <span class="card-text">${el.price} UAH</span>
      <button class="btn btn-primary btn-toBasketMain" >В корзину</button>    </div>
  </div></li>`),
  )
  listBaking.insertAdjacentHTML('afterbegin', string)
}

fill()

function assign() {
  imgModal.setAttribute('src', target.getAttribute('src'))
  imgModal.setAttribute('alt', target.getAttribute('alt'))
  const temp = _.find(baking, ['preview', target.getAttribute('src')])
  title.textContent = temp.title
  price.textContent = `${temp.subtitle}, в наличии ${temp.amount} шт. по цене ${temp.price} ${temp.currency}`
  priceEl = temp.price
  amountEl = temp.amount
  titleEl = temp.title
}

function modalWindow(event) {
  if (event.target.matches('.card-img-top')) {
    event.preventDefault()
    target = event.target
    modal.classList.add('is-open')
    assign()
  }
}

function closeWindow() {
  modal.classList.remove('is-open')
  imgModal.removeAttribute('src')
  imgModal.removeAttribute('alt')
  title.textContent = ''
  price.textContent = ''
  priceEl = 0
  amountEl = 0
}

function buy() {
  if (amountEl > 0) {
    totalSum += priceEl
    amountEl--
    basket.insertAdjacentHTML(
      'afterbegin',
      `<li class="list-group-item d-flex justify-content-between align-items-start">
<div class="ms-2 me-auto">
  <div class="fw-bold title-item">${titleEl}</div>
  Стоимость ${priceEl} UAH
</div>
<button type="button" class="btn btn-primary btn-clear" >Отмена</button>
</li>`,
    )
    sum.textContent = 'Общая стоимость ' + totalSum + 'грн'
  } else {
    alert('Нет в наличии')
  }
}

function toBasketMain(event) {
  if (event.target.matches('.btn-toBasketMain')) {
    event.preventDefault()
    target = event.target.parentNode.previousElementSibling
    assign()
    buy()
  }
}

function clearBasket() {
  const list = basket.querySelectorAll('li')
  list.forEach((el) => basket.removeChild(el))
  totalSum = 0
  sum.textContent = 'Общая стоимость 0 грн'
}

function clearItemBasket(event) {
  if (event.target.matches('.btn-clear')) {
    event.preventDefault()
    target = event.target.parentNode
    const temp = _.find(baking, [
      'title',
      target.querySelector('.title-item').textContent,
    ])
    totalSum -= temp.price
    target.remove()
    sum.textContent = 'Общая стоимость ' + totalSum + ' грн'
  }
}

/**function search(event) {
  _.forEach(listBaking.querySelectorAll('.card-title'), function (el) {
    if (el.textContent.toLowerCase() === inputSearch.value.toLowerCase()) {
      target = el.parentNode.previousElementSibling
      assign()
      modal.classList.add('is-open')
      return
    }
  })
  if (!modal.classList.contains('is-open')) alert('Ничего не найдено')
}**/

function search_2(event) {
  event.preventDefault()
  string = ''
  baking.forEach((el) => {
    if (
      _.includes(el.title.toLocaleLowerCase(), inputSearch.value.toLowerCase())
    ) {
      string += `<li><div class="card" style="width: 18rem;">
      <img src="${el.preview}" class="card-img-top" alt="${el.description}" width ="200" height="150">
      <div class="card-body">
        <h5 class="card-title">${el.title}</h5>
        <span class="card-text">${el.price} UAH</span>
        <button class="btn btn-primary btn-toBasketMain" >В корзину</button>    </div>
    </div></li>`
    }
  })
  if (string === '' || inputSearch.value === '') {
    console.log('alert')
    alert('Ничего не найдено')
    inputSearch.value = ''
    fill()
  } else {
    inputSearch.value = ''
    listBaking.previousElementSibling.textContent = 'Результаты поиска'
    const listLi = listBaking.querySelectorAll('li')
    listLi.forEach((el) => listBaking.removeChild(el))
    listBaking.insertAdjacentHTML('afterbegin', string)
  }
}

btnSearch.addEventListener('click', search_2)
listBaking.addEventListener('click', modalWindow)
button.addEventListener('click', closeWindow)
overlay.addEventListener('click', closeWindow)
listBaking.addEventListener('click', toBasketMain)
btnClearBasket.addEventListener('click', clearBasket)
basket.addEventListener('click', clearItemBasket)
toBasket.addEventListener('click', buy)
