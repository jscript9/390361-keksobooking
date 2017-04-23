'use strict';

window.objectDialog = (function () {
  var TYPES_OF_HOUSES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogCloseButton = document.querySelector('.dialog__close');
  var dialog = document.querySelector('.dialog');
  var container = document.querySelector('.tokyo__pin-map');

  dialogCloseButton.addEventListener('click', function (evt) {
    dialogClose();
  });

  dialogCloseButton.addEventListener('keydown', function (evt) {
    if (window.utils.enterPress(evt)) {
      dialogClose();
    }
  });

  function dialogClose() {
    dialog.classList.add('hidden');
    deactivateAllPin();
    document.removeEventListener('keydown', onEscPress);
  }

  function dialogOpen() {
    dialog.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  }

  function onEscPress(evt) {
    if (window.utils.escPress(evt)) {
      dialogClose();
      deactivateAllPin();
    }
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

  var makeNewDialog = function (offerItem) {

    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanel.parentElement.replaceChild(createOfferDialog(offerItem), dialogPanel);
    document.querySelector('.dialog__title img').src = offerItem.author.avatar;

  };

  function deactivateAllPin() {
    var pins = container.querySelectorAll('.pin--active');
    var arrayPins = Array.prototype.slice.call(pins);
    var arrayLength = arrayPins.length;

    for (var i = 0; i < arrayLength; i++) {
      arrayPins[i].classList.remove('pin--active');
    }
  }

  function openOfferDialog(pinElement) {
    deactivateAllPin();
    pinElement.classList.add('pin--active');

    var offerId = pinElement.getAttribute('data-pin--id');
    var currentOffer = window.makeObject.makeAllOfferObjects(8)[offerId];

    dialogOpen();
    makeNewDialog(currentOffer);
  }

  return {
    openOfferDialog: openOfferDialog,
  };

})();
