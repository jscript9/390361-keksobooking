'use strict';

window.makePin = (function () {
  var pinEl = document.querySelector('.tokyo__pin-map');

  function renderOffers(offerItems) {

    var newDocFragment = document.createDocumentFragment();
    var newPin;

    for (var i = 0; i < offerItems.length; i++) {
      newPin = createPin(offerItems[i]);
      newPin.setAttribute('data-pin--id', i);
      newDocFragment.appendChild(newPin);
    }

    pinEl.appendChild(newDocFragment);
  }

  renderOffers(window.makeObject.makeAllOfferObjects(8));

  var container = document.querySelector('.tokyo__pin-map');

  container.addEventListener('click', onClickPin);
  container.addEventListener('keydown', function (evt) {
    if (window.utils.enterPress(evt)) {
      onClickPin(evt);
    }
  });

  function onClickPin(event) {
    var target = event.target;

    while (target !== container) {
      if (target.classList.contains('pin') && (!target.classList.contains('pin__main'))) {
        window.objectDialog.openOfferDialog(target);
        return;
      }

      target = target.parentNode;
    }

  }

  function createPin(offer) {
    var pin = document.createElement('div');

    pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
    pin.classList.add('pin');
    pin.setAttribute('tabindex', 0);
    pin.style.left = offer.location.x + 28 + 'px';
    pin.style.top = offer.location.y + 75 + 'px';

    return pin;
  }

  return {
    createPin: createPin,
    renderOffers: renderOffers,
  };
})();
