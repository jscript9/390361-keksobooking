'use strict';

window.makeObject = (function () {
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


  var CHEKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHEKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURE_NAMES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  function getUserAvatar() {
    return 'img/avatars/user0' + window.utils.getRandomArrayIndex(UsersPhotosNumbers) + '.png';
  }


  function makeOfferObject() {
    var result = {};
    result.author = {};
    result.author.avatar = getUserAvatar();

    result.offer = {};
    result.offer.title = window.utils.getRandomArrayIndex(ARRAY_OF_TITLES);
    result.offer.address = window.utils.randomInteger(300, 900) + ', ' + window.utils.randomInteger(100, 500);
    result.offer.price = window.utils.randomInteger(1000, 1000000);
    result.offer.type = TYPE_NAME[window.utils.randomInteger(0, 2)];
    result.offer.rooms = window.utils.randomInteger(1, 5);
    result.offer.guests = window.utils.randomInteger(1, 10);
    result.offer.checkin = CHEKIN_TIME[window.utils.randomInteger(0, 2)];
    result.offer.checkout = CHEKOUT_TIME[window.utils.randomInteger(0, 2)];
    result.offer.features = featuresRandom();
    result.offer.description = '';
    result.offer.photos = [];

    result.location = {};
    result.location.x = window.utils.randomInteger(300, 900);
    result.location.y = window.utils.randomInteger(100, 500);

    return result;
  }

  function makeAllOfferObjects(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result[i] = makeOfferObject();
    }

    return result;
  }

  function featuresRandom() {
    var newFeatureNames = FEATURE_NAMES.slice();
    // newFeatureNames.sort(compareRandom);
    newFeatureNames.length = window.utils.randomInteger(1, 6);
    var result = [];
    for (var i = 0; i < newFeatureNames.length; i++) {
      result.push(newFeatureNames[i]);

    }
    return result;
  }

  return {
    makeAllOfferObjects: makeAllOfferObjects,
  };
})();
