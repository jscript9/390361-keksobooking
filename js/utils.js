'use strict';

window.utils = (function () {
  function enterPress(evt) {
    return evt.keyCode === 13;
  }

  function escPress(evt) {
    return evt.keyCode === 27;
  }

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function getRandomArrayIndex(array) {
    var randNum = Math.floor(Math.random() * array.length);
    var result = array[randNum];
    array.splice(randNum, 1);
    return result;
  }

//   function escPress(evt) {
//   if (evt.keyCode === 27) {
//     dialogClose();
//     deactivateAllPin();
//   }
// }

  return {
    enterPress: enterPress,
    escPress: escPress,
    randomInteger: randomInteger,
    getRandomArrayIndex: getRandomArrayIndex,
  };
})();
