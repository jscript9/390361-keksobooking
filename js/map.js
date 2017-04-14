'use strict';

var UsersPhotosNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

var ARRAY_OF_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPE_NAME = [
  'flat', 'house', 'bungalo'
];

var TYPES_OF_HOUSES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var CHEKIN_TIME = ['12:00', '13:00', '14:00'];
var CHEKOUT_TIME = ['12:00', '13:00', '14:00'];
var featuresName = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var offerHouses = makeAllOfferObjects(8);
var pinEl = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
// var offerDialogEl = document.querySelector('#offer-dialog');
// var newOfferDialogElement = createOfferDialog(offerHouses[0]);

function createPin(offer) {
  var pin = document.createElement('div');

  pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
  pin.classList.add('pin');
  pin.style.left = offer.location.x + 28 + 'px';
  pin.style.top = offer.location.y + 75 + 'px';

  return pin;
}

function getUserAvatar() {
  return 'img/avatars/user0' + getRandomArrayIndex(UsersPhotosNumbers) + '.png';
}


function makeOfferObject() {
  var result = {};
  result.author = {};
  result.author.avatar = getUserAvatar();

  result.offer = {};
  result.offer.title = getRandomArrayIndex(ARRAY_OF_TITLES);
  result.offer.address = randomInteger(300, 900) + ', ' + randomInteger(100, 500);
  result.offer.price = randomInteger(1000, 1000000);
  result.offer.type = TYPE_NAME[randomInteger(0, 2)];
  result.offer.rooms = randomInteger(1, 5);
  result.offer.guests = randomInteger(1, 10);
  result.offer.checkin = CHEKIN_TIME[randomInteger(0, 2)];
  result.offer.checkout = CHEKOUT_TIME[randomInteger(0, 2)];
  result.offer.features = featuresRandom(featuresName);
  result.offer.description = '';
  result.offer.photos = [];

  result.location = {};
  result.location.x = randomInteger(300, 900);
  result.location.y = randomInteger(100, 500);

  return result;
}

function makeAllOfferObjects(count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result[i] = makeOfferObject();
  }

  return result;
}

function getRandomArrayIndex(array) {
  var randNum = Math.floor(Math.random() * array.length);
  var result = array[randNum];
  array.splice(randNum, 1);
  return result;
}


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function featuresRandom(array) {
  array.sort(compareRandom);
  array.length = randomInteger(1, 6);
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}

function createOfferDialog(offerObject) {

  var newOfferDialogEl = lodgeTemplate.cloneNode(true);
  var lodgeFeatures = newOfferDialogEl.querySelector('.lodge__features');

  newOfferDialogEl.querySelector('.lodge__title').textContent = offerObject.offer.title;
  newOfferDialogEl.querySelector('.lodge__address').textContent = offerObject.offer.address;
  newOfferDialogEl.querySelector('.lodge__price').textContent = offerObject.offer.price + '₽/ночь';
  newOfferDialogEl.querySelector('.lodge__type').textContent = TYPES_OF_HOUSES[offerObject.offer.type];
  newOfferDialogEl.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  newOfferDialogEl.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

  for (var i = 0; i < offerObject.offer.features.length; i++) {
    var feature = document.createElement('span');

    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + offerObject.offer.features[i]);

    lodgeFeatures.appendChild(feature);
  }

  newOfferDialogEl.querySelector('.lodge__description').textContent = offerObject.offer.description;
  // newOfferDialogEl.querySelector('.dialog__panel').classList.add('dialog');
  return newOfferDialogEl;
}

function renderOffers(offerItems) {

  var newDocFragment = document.createDocumentFragment();

  for (var i = 0; i < offerItems.length; i++) {
    newDocFragment.appendChild(createPin(offerItems[i]));
  }

  pinEl.appendChild(newDocFragment);
  // offerDialogEl.parentElement.replaceChild(newOfferDialogElement, offerDialogEl);
}

var dialog = document.querySelector('.dialog');
var dialogPanel = document.querySelector('.dialog__panel');

var newDialog = function (offerItems) {
  dialog.replaceChild(createOfferDialog(offerItems), dialogPanel);
  document.querySelector('.dialog__title img').src = offerItems.author.avatar;
};

renderOffers(offerHouses);
newDialog(offerHouses[5]);

// newDialog(offerHouses[offerHouses.length - 1]);


// var pinItem = document.querySelector('.pin');
// var pinActive = document.querySelector('.pin.pin--active');
// var clickedElement = null;


// var clickHandler = function (evt) {

//   if (clickedElement) {
//     clickedElement.classList.remove('pin--active');
//   }

//   clickedElement = evt.currentTarget;
//   clickedElement.classList.add('pin--active');
// };

// for (var i = 0; i < pinItem.length; i++) {
//   pinItem[i].addEventListener('click', clickHandler, true);
//   createOfferDialog(offerHouses[i]);
// }

// // pinItem.addEventListener('click', function () {

// //   pinItem.classList.add('pin--active');

// // });

// // createPin(offerHouses[i]).addEventListener('click', function);
