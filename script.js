var frames = document.querySelectorAll('.frame');
var box = document.querySelector('.box');
var dice = document.querySelector('#dice');

function changeFrame(diceRoll) {
  console.log(diceRoll);
  let rect = box.getBoundingClientRect();

  //move the player
  Array.from(frames)[Array.from(frames).indexOf(box.parentElement) + diceRoll].appendChild(box);

  let trapValue = Array.from(frames)[Array.from(frames).indexOf(box.parentElement)].getAttribute('value');
  console.log(trapValue);

  TweenMax.set(box, { x: 0, y: 0 });

  var newRect = box.getBoundingClientRect();

  //animation speed and ease
  TweenMax.from(box, 4, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });
}

dice.addEventListener('click', () => {
  changeFrame(rollDice());
});

//DICE

function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}
