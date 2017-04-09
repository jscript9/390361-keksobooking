'use strict';

var UsersPhotosNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var houses = makeAllOfferObjects(8);
var titleName = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeName = [
  'flat', 'house', 'bungalo'
];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresName = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var TYPES_OF_HOUSES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

function getUserAvatar() {
  return 'img/avatars/user0' + getRandomArrayIndex(UsersPhotosNumbers) + '.png';
}

function getRandomTitle() {
  return titleName[getRandomArrayIndex(titleName)];
}

function getObjectPrice() {
  return randomInteger(1000, 1000000);
}

function getObjectType() {
  return typeName[randomInteger(0, 2)];
}

function getLocationX() {
  return randomInteger(300, 900);
}

function getLocationY() {
  return randomInteger(100, 500);
}

function getNumberOfRomms() {
  return randomInteger(1, 5);
}

function getNumberOfGuests() {
  return randomInteger(1, 10);
}

function getCheckinTime() {
  return checkinTime[randomInteger(0, 2)];
}

function getCheckoutTime() {
  return checkoutTime[randomInteger(0, 2)];
}

function getFeatures() {
  return featuresRandom(featuresName);
}

function getDescription() {
  return '';
}

function getPhotos() {
  return [];
}

function makeOfferObject() {
  var result = {};
  result.author = {};
  result.author.avatar = getUserAvatar();

  result.offer = {};
  result.offer.title = getRandomTitle();
  result.offer.addres = getLocationX() + ', ' + getLocationY();
  result.offer.price = getObjectPrice();
  result.offer.type = getObjectType();
  result.offer.rooms = getNumberOfRomms();
  result.offer.guests = getNumberOfGuests();
  result.offer.checkin = getCheckinTime();
  result.offer.checkout = getCheckoutTime();
  result.offer.features = getFeatures();
  result.offer.description = getDescription();
  result.offer.photos = getPhotos();

  result.location = {};
  result.location.x = getLocationX();
  result.location.y = getLocationY();

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

function featuresRandom(featuresList) {
  featuresName.sort(compareRandom);
  featuresName.length = randomInteger(1, 6);
  var result = [];
  for (var i = 0; i < featuresName.length; i++) {
    result.push(featuresName[i]);
  }
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

var dialogPanel = document.querySelector('.dialog__panel');
var dialogImage = document.querySelector('.dialog__title img');
var lodgeTemplate = document.querySelector('#lodge-template');
var pinMap = document.querySelector('.tokyo__pin-map');
var newFragment = document.createDocumentFragment();


for (var i = 0; i < houses.length; i++) {
  var pin = document.createElement('div');
  pin.innerHTML = '<img src="' + houses[i].author.avatar + '" style = "max-width:38px;">';
  pin.classList.add('pin');
  pin.style.left = houses[i].location.x + 28 + 'px';
  pin.style.top = houses[i].location.y + 75 + 'px';

  newFragment.appendChild(pin);
}

pinMap.appendChild(newFragment);

function renderHouse(house) {
  var houseElement = lodgeTemplate.cloneNode(true);
  houseElement.querySelector('.lodge__title').textContent = house.offer.title;
  houseElement.querySelector('.lodge__address').textContent = house.offer.address;
  houseElement.querySelector('.lodge__address').textContent = TYPES_OF_HOUSES[house.offer.type];
  houseElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + house.offer.guest + ' гостей в ' + house.offer.rooms + ' комнатах';
  houseElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + house.offer.checkin + ', ' + 'выезд до ' + house.offer.checkout;
  for (i = 0; i < house.offer.features.length; i++) {
    var offerFeature = houseElement.querySelector('.lodge__features').createElement('span');
    offerFeature.className = 'feature__image feature__image--' + house.offer.feature[i];
  }
  houseElement.querySelector('.lodge__description').textContent = house.offer.description;
}

document.replaceChild(renderHouse(houses[0]), dialogPanel);
dialogImage.src = houses[0].author.avatar;
