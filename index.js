var Swing = require('swing');
var RIGHT = Swing.Direction.RIGHT;

var cardElements = [].slice.call(document.querySelectorAll('.cards__card'));
var cards = [];
var likeElement = document.querySelector('.actions__like');
var throwoutCount = 0;

var stack = Swing.Stack({
  allowedDirections: [RIGHT],
  throwOutDistance: function () { return window.outerWidth * 1.5 }
});

cardElements.forEach(function(cardElement){
  var card = stack.createCard(cardElement);
  cards.push(card);
});

stack.on('throwoutend', function (event) {
  throwoutCount++;

  if (throwoutCount >= cards.length) {
    document.querySelector('.timder').classList.add('timder--complete');
    setTimeout(function(){
      document.querySelector('.timder').classList.add('timder--match');
    }, 5);
  }
});

likeElement.addEventListener('click', function (event) {
  event.preventDefault();

  var cardIndex = cards.length - (throwoutCount + 1);

  cards[cardIndex].throwOut(window.outerWidth / 1.5, 0, RIGHT);
});
