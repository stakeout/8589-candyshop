'use strict';
var GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк',
  'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан',
  'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв',
  'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок',
  'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение',
  'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные',
  'Бельгийское пенное', 'Острый язычок'];
var CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];
var IMAGES = [
  'soda-russian.jpg',
  'soda-peanut-grapes.jpg',
  'soda-garlic.jpg',
  'soda-cob.jpg',
  'soda-celery.jpg',
  'soda-bacon.jpg',
  'marshmallow-wine.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-bacon.jpg',
  'marmalade-sour.jpg',
  'marmalade-new-year.jpg',
  'marmalade-corn.jpg',
  'marmalade-caviar.jpg',
  'marmalade-beer.jpg',
  'ice-pig.jpg',
  'ice-mushroom.jpg',
  'ice-italian.jpg',
  'ice-garlic.jpg',
  'ice-eggplant.jpg',
  'ice-cucumber.jpg',
  'gum-wasabi.jpg',
  'gum-portwine.jpg',
  'gum-mustard.jpg',
  'gum-eggplant.jpg',
  'gum-chile.jpg',
  'gum-cedar.jpg'
];
var CATALOG_ELEMETS_COUNT = 26;
var BASKET_ELEMETS_COUNT = 3;
var PATH_TO_IMG_DIR = 'img/cards/';
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomValueFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var AMOUNT_RANGE = {
  min: 0,
  max: 20
};
var PRICE_RANGE = {
  min: 100,
  max: 1500
};
var WEIGHT_RANGE = {
  min: 30,
  max: 300
};
var RATING = {
  value: {
    min: 1,
    max: 5
  },
  number: {
    min: 10,
    max: 900
  }
};
var nutritionFacts = {
  sugar: getRandomInt(0, 1),
  energy: {
    min: 70,
    max: 500
  },
  contents: getRandomValueFromArray(CONTENTS)
};

var getArrayOfObjects = function (objetsCount) {
  var getImageUrlFromArray = function (arrayOfImageNames, pathToDir, randomValue) {
    if (randomValue) {
      return pathToDir + getRandomValueFromArray(arrayOfImageNames);
    } else {
      return pathToDir + arrayOfImageNames[i];
    }
  };
  var goods = [];
  for (var i = 0; i < objetsCount; ++i) {
    var goodsItem = {
      name: getRandomValueFromArray(GOODS),
      picture: getImageUrlFromArray(IMAGES, PATH_TO_IMG_DIR, true),
      amount: getRandomInt(AMOUNT_RANGE.min, AMOUNT_RANGE.max),
      price: getRandomInt(PRICE_RANGE.min, PRICE_RANGE.max),
      weight: getRandomInt(WEIGHT_RANGE.min, WEIGHT_RANGE.max),
      rating: {
        value: getRandomInt(RATING.value.min, RATING.value.max),
        number: getRandomInt(RATING.number.min, RATING.number.max)
      },
      nutritionFacts: {
        sugar: nutritionFacts.sugar,
        energy: getRandomInt(nutritionFacts.energy.min, nutritionFacts.energy.max),
        contents: nutritionFacts.contents
      }
    };
    goods.push(goodsItem);
  }
  return goods;
};

// part 2
var catalog = document.querySelector('.catalog');
catalog.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
catalog.querySelector('.catalog__load').classList.add('visually-hidden');

// create card template
var cardTemplate = document.querySelector('#card').content.querySelector('.card');

// create DOM element on template base
var renderCatalogCard = function (item) {
  var cardItem = cardTemplate.cloneNode(true);
  if (item.amount > 5) {
    cardItem.classList.add('card--in-stock');
  } else if (item.amount >= 1 && item.amount <= 5) {
    cardItem.classList.add('card--little');
  } else {
    cardItem.classList.add('card--soon');
  }
  cardItem.querySelector('.card__title').textContent = item.name;
  cardItem.querySelector('.card__img').src = item.picture;
  cardItem.querySelector('.card__price').innerHTML = item.price + ' ' +
  '<span class="card__currency">₽</span><span class="card__weight">/ ' + item.weight + ' Г</span>';
  cardItem.querySelector('.star__count').textContent = item.rating.number;
  if (item.nutritionFacts.sugar) {
    cardItem.querySelector('.card__characteristic').textContent = 'Содержит сахар';
  } else {
    cardItem.querySelector('.card__characteristic').textContent = 'Без сахара';
  }
  cardItem.querySelector('.card__composition-list').textContent = item.contents;
  switch (item.rating.value) {
    case 1:
      cardItem.classList.add('.stars__rating--one');
      break;
    case 2:
      cardItem.classList.add('.stars__rating--two');
      break;
    case 3:
      cardItem.classList.add('.stars__rating--three');
      break;
    case 4:
      cardItem.classList.add('.stars__rating--four');
      break;
    case 5:
      cardItem.classList.add('.stars__rating--five');
      break;
  }
  return cardItem;
};

var getFragment = function (renderFunction, arrayOfCardsObjects) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfCardsObjects.length; ++i) {
    fragment.appendChild(renderFunction(arrayOfCardsObjects[i]));
  }
  return fragment;
};
var catalogCardsContainer = catalog.querySelector('.catalog__cards');
var renderItemsInContainer = function (renderFunction, arrayOfCardsObjects, classOfContainer) {
  classOfContainer.appendChild(getFragment(renderFunction, arrayOfCardsObjects));
};

renderItemsInContainer(renderCatalogCard, getArrayOfObjects(CATALOG_ELEMETS_COUNT), catalogCardsContainer);

// part 3
var orderCardTemplate = document.querySelector('#card-order').content.querySelector('.card-order');
var goodsCardsContainer = document.querySelector('.goods__cards');
document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');
// create DOM element on template base
var renderOrderList = function (item) {
  var cardItem = orderCardTemplate.cloneNode(true);
  cardItem.querySelector('.card-order__title').textContent = item.name;
  cardItem.querySelector('.card-order__img').src = item.picture;
  cardItem.querySelector('.card-order__price').textContent = item.price + ' ₽';
  return cardItem;
};

renderItemsInContainer(renderOrderList, getArrayOfObjects(BASKET_ELEMETS_COUNT), goodsCardsContainer);
