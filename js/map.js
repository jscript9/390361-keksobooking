var houses = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png',
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': 'houses[0].location.x, houses[0].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'flat',
      'rooms': randomInteger(1, 5),
      'guests': 10,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    },

   {
    'author': {
      'avatar': 'img/avatars/user02.png',
    },

    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': 'houses[1].location.x, houses[1].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'flat',
      'rooms': randomInteger(1, 5),
      'guests': 8,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['wifi', 'parking', 'washer', 'elevator'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user03.png',
    },

    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': 'houses[2].location.x, houses[2].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'bungalo',
      'rooms': randomInteger(1, 5),
      'guests': 11,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['wifi', 'parking', 'washer', 'elevator'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user04.png',
    },

    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': 'houses[3].location.x, houses[3].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'bungalo',
      'rooms': randomInteger(1, 5),
      'guests': 6,
      'checkin': '14:00',
      'checkout': '15:00',
      'features': ['wifi', 'parking'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user05.png',
    },

    'offer': {
      'title': 'Красивый гостевой домик',
      'address': 'houses[4].location.x, houses[4].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'house',
      'rooms': randomInteger(1, 5),
      'guests': 5,
      'checkin': '14:00',
      'checkout': '15:00',
      'features': ['wifi', 'parking', 'washer'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user06.png',
    },

    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': 'houses[5].location.x, houses[5].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'house',
      'rooms': randomInteger(1, 5),
      'guests': 7,
      'checkin': '14:00',
      'checkout': '15:00',
      'features': ['parking', 'washer'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user07.png',
    },

    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': 'houses[6].location.x, houses[6].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'bungalo',
      'rooms': randomInteger(1, 5),
      'guests': 4,
      'checkin': '13:00',
      'checkout': '15:00',
      'features': ['washer'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user08.png',
    },

    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': 'houses[7].location.x, houses[7].location.y',
      'price': randomInteger(1000, 1000000),
      'type': 'bungalo',
      'rooms': randomInteger(1, 5),
      'guests': 5,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['washer'],
      'description': '',
      'photos': ''
    },

    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
    }
  },
];

var dialogPanel = document.querySelector('.dialog__panel');
var dialogImage = document.querySelector('.dialog__title')('img');
var lodgeTemplate = document.querySelector('#lodge-template');
var pinMap = document.querySelector('.tokyo__pin-map');
var newFragment = createDocumentFragment();

for (var i = 0; i < houses.length; i++) {
    var pin = '<div class="pin" style="left: ' + houses[i].location.x + 'px; ' + 'top: ' + houses[i].location.y + 'px><img src=' +'"'
    +houses[i].author.avatar + '"' + 'class="rounded" width="40" height="40"></div>';
    newFragment.appendChild(pin);
}
pinMap.appendChild(newFragment);

var renderHouse = function(house) {
    var houseElement = lodgeTemplate.cloneNode(true);
    houseElement.querySelector('lodge-template').textContent = house.offer.title;
    houseElement.querySelector('lodge__address').textContent = house.offer.address;
    if (house.offer.type === 'flat'){
        houseElement.querySelector('lodge__address').textContent = 'Квартира';
    } else if (house.offer.type === 'bungalo'){
        houseElement.querySelector('lodge__address').textContent = 'Бунгало';
    } else{
        houseElement.querySelector('lodge__address').textContent = 'Дом';
    }
    houseElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + house.offer.guest + ' гостей в ' + house.offer.rooms + ' комнатах';
    houseElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + house.offer.checkin + ', ' + 'выезд до ' + house.offer.checkout;
    for (var i = 0; i < house.offer.features.length; i++){
     var offerFeature = houseElement.querySelector('.lodge__features').createElement('span');
     offerFeature.className = 'feature__image feature__image--' + house.offer.feature[i];
    }
    houseElement.querySelector('.lodge__description').textContent = house.offer.description;
}
document.replaceChild(renderHouse(houses[0]), dialogPanel);
dialogImage.src = houses[0].author.avatar;

var randomInteger = function(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }