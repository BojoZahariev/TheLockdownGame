var teamBlue = document.querySelectorAll('.frame');
var box = document.querySelector('.box');

Array.from(teamBlue).forEach(element => element.addEventListener('click', changeFrame));

function changeFrame() {
  var rect = box.getBoundingClientRect();
  this.appendChild(box);

  TweenMax.set(box, { x: 0, y: 0 });

  var newRect = box.getBoundingClientRect();

  TweenMax.from(box, 1, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });
}

//DICE

function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}

console.log(rollDice());
