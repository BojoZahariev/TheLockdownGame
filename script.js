var teamBlue = document.querySelectorAll('.frame');
//var teamRed = document.querySelector('.red');
var box = document.querySelector('.box');

Array.from(teamBlue).forEach(element => element.addEventListener('click', changeTeam));
//teamRed.addEventListener('click', changeTeam);

function changeTeam() {
  var rect = box.getBoundingClientRect();
  var classes = this.classList;
  this.appendChild(box);

  TweenMax.set(box, { x: 0, y: 0 });
  /*
  if (classes.contains('red')) {
    TweenMax.to(box, 1, { backgroundColor: 'red' });
  } else if (classes.contains('blue')) {
    TweenMax.to(box, 1, { backgroundColor: 'blue' });
  }
*/
  var newRect = box.getBoundingClientRect();

  TweenMax.from(box, 1, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power3.easeOut
  });
}

//DICE

function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}

console.log(rollDice());
