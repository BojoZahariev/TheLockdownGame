var teamBlue = document.querySelectorAll('.frame');
var box = document.querySelector('.box');
var dice = document.querySelector('#dice');

Array.from(teamBlue).forEach(element => element.addEventListener('click', changeFrame));

function changeFrame(position) {
  console.log(position);
  var rect = box.getBoundingClientRect();
  Array.from(teamBlue)[Array.from(teamBlue).indexOf(box.parentElement) + position].appendChild(box);

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
  //console.log(Array.from(teamBlue).indexOf(box.parentElement));
  changeFrame(rollDice());
});

//DICE

function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}
