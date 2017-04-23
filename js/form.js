'use strict';

(function () {
// var form = document.querySelector('#notice__form');
  var arriveTime = document.querySelector('#time');
  var leaveTime = document.querySelector('#timeout');
  var typeOfHome = document.querySelector('#type');
  var price = document.querySelector('#price');
  var numberOfRooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var noticeForm = document.querySelector('.notice__form');
  var submitButton = noticeForm.querySelector('.form__submit');


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

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    for (var i = 0; i < noticeForm.elements.length; i++) {
      if (!noticeForm.elements[i].checkValidity()) {
        noticeForm.elements[i].style = 'border-color: red';
      }
    }
  });
})();
