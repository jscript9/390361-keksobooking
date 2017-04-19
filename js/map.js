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
var FEATURE_NAMES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var offerHouses = makeAllOfferObjects(8);
var pinEl = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
// var offerDialogEl = document.querySelector('#offer-dialog');
// var newOfferDialogElement = createOfferDialog(offerHouses[0]);
// var pinActive = document.querySelector('.pin--active');
var dialogCloseButton = document.querySelector('.dialog__close');

dialogCloseButton.addEventListener('click', function (evt) {
  dialogClose();
});

dialogCloseButton.addEventListener('keydown', function (evt) {
  if (onEnterPress(evt)) {
    dialogClose();
  }
});

function dialogClose() {
  dialog.classList.add('hidden');
  // removePinActive();
  document.removeEventListener('keydown', onEscPress);
}

function dialogOpen() {
  dialog.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
}

function onEnterPress(evt) {
  return evt.keyCode === 13;
}

function onEscPress(evt) {
  if (evt.keyCode === 27) {
    dialogClose();
  }
}

function createPin(offer) {
  var pin = document.createElement('div');

  pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
  pin.classList.add('pin');
  pin.setAttribute('tabindex', 0);
  pin.style.left = offer.location.x + 28 + 'px';
  pin.style.top = offer.location.y + 75 + 'px';
 // pin.addEventListener('click', function (evt) {
 //   addPinActive(pin, offer);
//  });

 // pin.addEventListener('keydown', function (evt) {
 //   if (onEnterPress(evt)) {
  //    addPinActive(pin, offer);
  //  }
//  });

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
  result.offer.features = featuresRandom();
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

function featuresRandom() {
  var newFeatureNames = FEATURE_NAMES.slice();
  // newFeatureNames.sort(compareRandom);
  newFeatureNames.length = randomInteger(1, 6);
  var result = [];
  for (var i = 0; i < newFeatureNames.length; i++) {
    result.push(newFeatureNames[i]);

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
  var newPin;

  for (var i = 0; i < offerItems.length; i++) {
    newPin = createPin(offerItems[i]);
    newPin.setAttribute('data-pin--id', i);
    newDocFragment.appendChild(newPin);
  }

  pinEl.appendChild(newDocFragment);
  // offerDialogEl.parentElement.replaceChild(newOfferDialogElement, offerDialogEl);
}

var dialog = document.querySelector('.dialog');

var makeNewDialog = function (offerItem) {

  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.parentElement.replaceChild(createOfferDialog(offerItem), dialogPanel);
  document.querySelector('.dialog__title img').src = offerItem.author.avatar;

};

renderOffers(offerHouses);

//* antonov

var container = document.querySelector('.tokyo__pin-map');

container.addEventListener('click', onClickPin);
container.addEventListener('keydown', function (evt) {
  if (onEnterPress(evt)) {
    onClickPin(evt);
  }
});

function onClickPin(event) {
  var target = event.target;

  while (target !== container) {
    if (target.classList.contains('pin') && (!target.classList.contains('pin__main'))) {
      openOfferDialog(target);
      return;
    }

    target = target.parentNode;
  }

}

function openOfferDialog(pinElement) {
  deactivateAllPin();
  pinElement.classList.add('pin--active');

  var offerId = pinElement.getAttribute('data-pin--id');
  var currentOffer = offerHouses[offerId];

  dialogOpen();
  makeNewDialog(currentOffer);
}

function deactivateAllPin() {
  var pins = container.querySelectorAll('.pin--active');
  var arrayPins = Array.prototype.slice.call(pins);
  var arrayLength = arrayPins.length;

  for (var i = 0; i < arrayLength; i++) {
    arrayPins[i].classList.remove('pin--active');
  }
}

var form = document.querySelector('#notice__form');
var arriveTime = document.querySelector('#time');
var leaveTime = document.querySelector('#timeout');
var typeOfHome = document.querySelector('#type');
var price = document.querySelector('#price');
var numberOfRooms = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var invalidHandler = function (evt) {
  evt.target.classList.add('mistake');
};

var ROOMS = {
  '1-room': '0-guest',
  '2-room': '3-guest',
  '100-room': '3-guest',
};

var TIMES_IN = {
  'come-in-12': 'come-out-12',
  'come-in-13': 'come-out-13',
  'come-in-14': 'come-out-14',
};

var TIMES_OUT = {
  'come-out-12': 'come-in-12',
  'come-out-13': 'come-in-13',
  'come-out-14': 'come-in-14',
};

var PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'palace': 10000,
};

numberOfRooms.addEventListener('change', function (evt) {
  capacity.value = ROOMS[numberOfRooms.value];
});

typeOfHome.addEventListener('change', function (evt) {
  price.value = PRICES[typeOfHome.value];
});

arriveTime.addEventListener('change', function (evt) {
  leaveTime.value = TIMES_IN[arriveTime.value];
});

leaveTime.addEventListener('change', function (evt) {
  arriveTime.value = TIMES_OUT[leaveTime.value];
});
